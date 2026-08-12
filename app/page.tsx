import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import {
  deleteWishlistItemAction,
  toggleWishlistItemFulfilledAction,
} from "@/lib/actions/wishlist";
import {
  deleteSupplyAction,
  toggleSupplyFulfilledAction,
} from "@/lib/actions/supplies";

const PAGE_SIZE = 8;

type SearchParams = Record<string, string | string[] | undefined>;

function param(searchParams: SearchParams, key: string): string | undefined {
  const value = searchParams[key];
  return Array.isArray(value) ? value[0] : value;
}

function pageParam(searchParams: SearchParams, key: string): number {
  const raw = Number(param(searchParams, key) ?? "1");
  return Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 1;
}

function buildHref(searchParams: SearchParams, overrides: Record<string, string>) {
  const next = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (typeof value === "string") next.set(key, value);
  }
  for (const [key, value] of Object.entries(overrides)) {
    next.set(key, value);
  }
  return `/?${next.toString()}`;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const session = await auth();
  const userId = session?.user?.id;

  const q = param(sp, "q")?.trim() ?? "";
  const wishSort = param(sp, "wishSort") === "createdAt" ? "createdAt" : "title";
  const wishDir = param(sp, "wishDir") === "desc" ? "desc" : "asc";
  const supplySort = ["name", "quantity", "condition", "createdAt"].includes(
    param(sp, "supplySort") ?? "",
  )
    ? (param(sp, "supplySort") as "name" | "quantity" | "condition" | "createdAt")
    : "name";
  const supplyDir = param(sp, "supplyDir") === "desc" ? "desc" : "asc";
  const wishPage = pageParam(sp, "wishPage");
  const supplyPage = pageParam(sp, "supplyPage");

  const wishWhere = q
    ? { title: { contains: q, mode: "insensitive" as const } }
    : {};
  const supplyWhere = q
    ? { name: { contains: q, mode: "insensitive" as const } }
    : {};

  const [wishlistItems, wishlistCount, supplies, supplyCount, categories] =
    await Promise.all([
      prisma.wishlistItem.findMany({
        where: wishWhere,
        orderBy: { [wishSort]: wishDir },
        skip: (wishPage - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      }),
      prisma.wishlistItem.count({ where: wishWhere }),
      prisma.supply.findMany({
        where: supplyWhere,
        orderBy: { [supplySort]: supplyDir },
        skip: (supplyPage - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        include: { category: true },
      }),
      prisma.supply.count({ where: supplyWhere }),
      prisma.category.findMany({ orderBy: { name: "asc" } }),
    ]);

  const wishPageCount = Math.max(1, Math.ceil(wishlistCount / PAGE_SIZE));
  const supplyPageCount = Math.max(1, Math.ceil(supplyCount / PAGE_SIZE));

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-semibold">
          Help animals in need get what they need
        </h1>
        <p className="mt-2 text-black/60 dark:text-white/60">
          Browse wishes from people caring for animals, or see what supplies
          others are offering.
        </p>
      </div>

      <form action="/" className="mx-auto mb-10 flex max-w-md gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search wishes and supplies…"
          className="flex-1 rounded border border-black/20 px-3 py-2 text-sm dark:border-white/20"
        />
        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
        >
          Search
        </button>
      </form>

      <div className="grid gap-8 md:grid-cols-2">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Wishes</h2>
            {userId && (
              <Link href="/wishlist/new" className="text-sm underline">
                + Post a wish
              </Link>
            )}
          </div>

          <div className="mb-3 flex gap-3 text-xs text-black/60 dark:text-white/60">
            <span>Sort:</span>
            <Link href={buildHref(sp, { wishSort: "title", wishDir: wishSort === "title" && wishDir === "asc" ? "desc" : "asc" })}>
              Title
            </Link>
            <Link href={buildHref(sp, { wishSort: "createdAt", wishDir: wishSort === "createdAt" && wishDir === "asc" ? "desc" : "asc" })}>
              Newest
            </Link>
          </div>

          <ul className="flex flex-col gap-3">
            {wishlistItems.length === 0 && (
              <li className="text-sm text-black/60 dark:text-white/60">
                No wishes yet.
              </li>
            )}
            {wishlistItems.map((item) => (
              <li
                key={item.id}
                className={`rounded border border-black/10 p-4 dark:border-white/10 ${
                  item.fulfilled ? "opacity-50" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium">
                    {item.title}
                    {item.fulfilled && (
                      <span className="ml-2 text-xs text-black/60 dark:text-white/60">
                        (fulfilled)
                      </span>
                    )}
                  </h3>
                </div>
                <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                  {item.description}
                </p>
                {item.userId === userId && (
                  <div className="mt-3 flex gap-3 text-xs">
                    <Link href={`/wishlist/${item.id}/edit`} className="underline">
                      Edit
                    </Link>
                    <form action={toggleWishlistItemFulfilledAction.bind(null, item.id)}>
                      <button type="submit" className="underline">
                        Mark {item.fulfilled ? "unfulfilled" : "fulfilled"}
                      </button>
                    </form>
                    <form action={deleteWishlistItemAction.bind(null, item.id)}>
                      <button type="submit" className="text-red-600 underline">
                        Delete
                      </button>
                    </form>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {wishPageCount > 1 && (
            <div className="mt-4 flex justify-center gap-4 text-sm">
              {wishPage > 1 && (
                <Link href={buildHref(sp, { wishPage: String(wishPage - 1) })}>
                  ← Previous
                </Link>
              )}
              <span className="text-black/60 dark:text-white/60">
                Page {wishPage} of {wishPageCount}
              </span>
              {wishPage < wishPageCount && (
                <Link href={buildHref(sp, { wishPage: String(wishPage + 1) })}>
                  Next →
                </Link>
              )}
            </div>
          )}
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Supplies offered</h2>
            {userId && (
              <Link href="/supplies/new" className="text-sm underline">
                + Offer an item
              </Link>
            )}
          </div>

          <div className="mb-3 flex gap-3 text-xs text-black/60 dark:text-white/60">
            <span>Sort:</span>
            <Link href={buildHref(sp, { supplySort: "name", supplyDir: supplySort === "name" && supplyDir === "asc" ? "desc" : "asc" })}>
              Name
            </Link>
            <Link href={buildHref(sp, { supplySort: "quantity", supplyDir: supplySort === "quantity" && supplyDir === "asc" ? "desc" : "asc" })}>
              Quantity
            </Link>
            <Link href={buildHref(sp, { supplySort: "createdAt", supplyDir: supplySort === "createdAt" && supplyDir === "asc" ? "desc" : "asc" })}>
              Newest
            </Link>
          </div>

          <ul className="flex flex-col gap-3">
            {supplies.length === 0 && (
              <li className="text-sm text-black/60 dark:text-white/60">
                No supplies offered yet.
              </li>
            )}
            {supplies.map((supply) => (
              <li
                key={supply.id}
                className={`rounded border border-black/10 p-4 dark:border-white/10 ${
                  supply.fulfilled ? "opacity-50" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium">
                    {supply.name}
                    {supply.fulfilled && (
                      <span className="ml-2 text-xs text-black/60 dark:text-white/60">
                        (fulfilled)
                      </span>
                    )}
                  </h3>
                  <span className="text-xs text-black/60 dark:text-white/60">
                    {supply.category.name}
                  </span>
                </div>
                <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                  {supply.description}
                </p>
                <p className="mt-1 text-xs text-black/60 dark:text-white/60">
                  Qty {supply.quantity} · {supply.condition}
                </p>
                {supply.userId === userId && (
                  <div className="mt-3 flex gap-3 text-xs">
                    <Link href={`/supplies/${supply.id}/edit`} className="underline">
                      Edit
                    </Link>
                    <form action={toggleSupplyFulfilledAction.bind(null, supply.id)}>
                      <button type="submit" className="underline">
                        Mark {supply.fulfilled ? "unfulfilled" : "fulfilled"}
                      </button>
                    </form>
                    <form action={deleteSupplyAction.bind(null, supply.id)}>
                      <button type="submit" className="text-red-600 underline">
                        Delete
                      </button>
                    </form>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {supplyPageCount > 1 && (
            <div className="mt-4 flex justify-center gap-4 text-sm">
              {supplyPage > 1 && (
                <Link href={buildHref(sp, { supplyPage: String(supplyPage - 1) })}>
                  ← Previous
                </Link>
              )}
              <span className="text-black/60 dark:text-white/60">
                Page {supplyPage} of {supplyPageCount}
              </span>
              {supplyPage < supplyPageCount && (
                <Link href={buildHref(sp, { supplyPage: String(supplyPage + 1) })}>
                  Next →
                </Link>
              )}
            </div>
          )}

          {categories.length === 0 && userId && (
            <p className="mt-4 text-xs text-black/60 dark:text-white/60">
              No categories exist yet — run the seed script so you can offer
              items.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
