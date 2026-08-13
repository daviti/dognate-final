import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import CategorySelect from "@/components/CategorySelect";
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
  return `/board?${next.toString()}`;
}

function PlaceholderThumb() {
  return (
    <div className="flex aspect-[3/2] items-center justify-center bg-brand-green/10">
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-10 w-10 text-brand-green/40"
      >
        <path d="M12 14c-3 0-6.5 1.7-6.5 4.2 0 1 .8 1.8 1.8 1.8h9.4c1 0 1.8-.8 1.8-1.8 0-2.5-3.5-4.2-6.5-4.2Z" />
        <circle cx="6" cy="9" r="1.8" />
        <circle cx="10" cy="6.5" r="1.8" />
        <circle cx="14" cy="6.5" r="1.8" />
        <circle cx="18" cy="9" r="1.8" />
      </svg>
    </div>
  );
}

export default async function BoardPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const session = await auth();
  const userId = session?.user?.id;

  const q = param(sp, "q")?.trim() ?? "";
  const categoryId = param(sp, "category")?.trim() ?? "";
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

  const currentParams: Record<string, string> = {};
  for (const [key, value] of Object.entries(sp)) {
    if (typeof value === "string") currentParams[key] = value;
  }

  const wishWhere = q
    ? { title: { contains: q, mode: "insensitive" as const } }
    : {};
  const supplyWhere = {
    ...(q ? { name: { contains: q, mode: "insensitive" as const } } : {}),
    ...(categoryId ? { categoryId } : {}),
  };

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
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="font-brand text-4xl font-extrabold">
            OFFER<span className="text-brand-green">WISH</span>
          </h1>
          <p className="mt-2 text-black/60 dark:text-white/60">
            Check our list. We have all kinds of items.
          </p>
        </div>
        <CategorySelect
          categories={categories}
          value={categoryId}
          currentParams={currentParams}
        />
      </div>

      <form action="/board" className="mt-8 mb-12 flex max-w-md gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search wishes and supplies…"
          className="flex-1 rounded border border-black/20 px-3 py-2 text-sm dark:border-white/20"
        />
        <button
          type="submit"
          className="rounded bg-brand-brown px-4 py-2 text-sm font-medium text-white"
        >
          Search
        </button>
      </form>

      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-brand text-xl font-bold">
            <span className="text-brand-green">DOGNATE</span> WISHES
          </h2>
          <div className="flex items-center gap-3 text-xs text-black/60 dark:text-white/60">
            <span>Sort:</span>
            <Link href={buildHref(sp, { wishSort: "title", wishDir: wishSort === "title" && wishDir === "asc" ? "desc" : "asc" })}>
              Title
            </Link>
            <Link href={buildHref(sp, { wishSort: "createdAt", wishDir: wishSort === "createdAt" && wishDir === "asc" ? "desc" : "asc" })}>
              Newest
            </Link>
            {userId && (
              <Link href="/wishlist/new" className="font-medium text-brand-green">
                + Post a wish
              </Link>
            )}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.length === 0 && (
            <p className="text-sm text-black/60 dark:text-white/60">
              No wishes yet.
            </p>
          )}
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white shadow-sm dark:bg-black ${item.fulfilled ? "opacity-50" : ""}`}
            >
              {item.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.photoUrl} alt="" className="aspect-[3/2] w-full object-cover" />
              ) : (
                <PlaceholderThumb />
              )}
              <div className="p-4">
                <h3 className="font-medium">
                  <span className="text-brand-green">Dognate</span> Wish.{" "}
                  {item.fulfilled && (
                    <span className="text-xs text-black/60 dark:text-white/60">
                      (fulfilled)
                    </span>
                  )}
                </h3>
                <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-black/60 dark:text-white/60">
                  {item.description}
                </p>
                {item.userId === userId && (
                  <div className="mt-3 flex gap-3 text-xs">
                    <Link href={`/wishlist/${item.id}/edit`} className="font-medium text-brand-green underline">
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
              </div>
            </div>
          ))}
        </div>

        {wishPageCount > 1 && (
          <div className="mt-6 flex justify-center gap-4 text-sm">
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

      <section className="mt-16">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-brand text-xl font-bold">
            <span className="text-brand-green">DOGNATE</span> OFFERS
          </h2>
          <div className="flex items-center gap-3 text-xs text-black/60 dark:text-white/60">
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
            {userId && (
              <Link href="/supplies/new" className="font-medium text-brand-green">
                + Offer an item
              </Link>
            )}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {supplies.length === 0 && (
            <p className="text-sm text-black/60 dark:text-white/60">
              No supplies offered yet.
            </p>
          )}
          {supplies.map((supply) => (
            <div
              key={supply.id}
              className={`bg-white shadow-sm dark:bg-black ${supply.fulfilled ? "opacity-50" : ""}`}
            >
              {supply.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={supply.photoUrl} alt="" className="aspect-[3/2] w-full object-cover" />
              ) : (
                <PlaceholderThumb />
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium">
                    <span className="text-brand-green">Dognate</span> Offer.{" "}
                    {supply.fulfilled && (
                      <span className="text-xs text-black/60 dark:text-white/60">
                        (fulfilled)
                      </span>
                    )}
                  </h3>
                  <span className="shrink-0 text-xs text-black/60 dark:text-white/60">
                    {supply.category.name}
                  </span>
                </div>
                <p className="mt-1 text-sm text-black/70 dark:text-white/70">
                  {supply.name}
                </p>
                <p className="mt-1 text-xs text-black/60 dark:text-white/60">
                  {supply.description}
                </p>
                <p className="mt-1 text-xs text-black/60 dark:text-white/60">
                  Qty {supply.quantity} · {supply.condition}
                </p>
                {supply.userId === userId && (
                  <div className="mt-3 flex gap-3 text-xs">
                    <Link href={`/supplies/${supply.id}/edit`} className="font-medium text-brand-green underline">
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
              </div>
            </div>
          ))}
        </div>

        {supplyPageCount > 1 && (
          <div className="mt-6 flex justify-center gap-4 text-sm">
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
  );
}
