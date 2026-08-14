import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import CategorySelect from "@/components/CategorySelect";
import Reveal from "@/components/Reveal";
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
    <div className="flex aspect-[16/9] items-center justify-center bg-paper-deep">
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-twine">
        <path d="M12 14c-3 0-6.5 1.7-6.5 4.2 0 1 .8 1.8 1.8 1.8h9.4c1 0 1.8-.8 1.8-1.8 0-2.5-3.5-4.2-6.5-4.2Z" />
        <circle cx="6" cy="9" r="1.8" />
        <circle cx="10" cy="6.5" r="1.8" />
        <circle cx="14" cy="6.5" r="1.8" />
        <circle cx="18" cy="9" r="1.8" />
      </svg>
    </div>
  );
}

function Punch() {
  return (
    <div className="absolute -top-1.5 left-4 h-3 w-3 rounded-full border border-hole bg-hole shadow-inner" />
  );
}

const rotations = ["-rotate-1", "rotate-1", "-rotate-[0.4deg]"];

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
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="stamped text-4xl">
            The <span className="text-stamp-red">board</span>
          </h1>
          <p className="mt-2 text-ink-soft">
            What&apos;s needed right now, and what&apos;s on offer.
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
          className="flex-1 border border-black/20 bg-card px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="stamp-btn border-2 border-brand-brown px-4 py-2 text-xs font-bold tracking-widest text-brand-brown uppercase hover:bg-brand-brown hover:text-card"
        >
          Search
        </button>
      </form>

      <section>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="stamped text-xl">Wishes</h2>
          <div className="flex items-center gap-3 font-mono text-xs text-ink-soft">
            <span>Sort:</span>
            <Link href={buildHref(sp, { wishSort: "title", wishDir: wishSort === "title" && wishDir === "asc" ? "desc" : "asc" })}>
              Title
            </Link>
            <Link href={buildHref(sp, { wishSort: "createdAt", wishDir: wishSort === "createdAt" && wishDir === "asc" ? "desc" : "asc" })}>
              Newest
            </Link>
            {userId && (
              <Link href="/wishlist/new" className="font-bold text-stamp-red-ink normal-case">
                + Post a wish
              </Link>
            )}
          </div>
        </div>

        <div className="grid gap-3 pt-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {wishlistItems.length === 0 && (
            <p className="text-sm text-ink-soft">No wishes yet.</p>
          )}
          {wishlistItems.map((item, i) => (
            <Reveal key={item.id} delay={Math.min(i, 8) * 0.04}>
            <div
              className={`relative bg-card shadow-sm transition-transform hover:rotate-0 hover:-translate-y-1 ${rotations[i % rotations.length]} ${item.fulfilled ? "opacity-60" : ""}`}
            >
              <Punch />
              {item.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.photoUrl} alt="" className="aspect-[16/9] w-full object-cover" />
              ) : (
                <PlaceholderThumb />
              )}
              <div className="p-2.5">
                <span
                  className={`-rotate-2 inline-block border-2 px-1.5 py-0.5 text-[0.55rem] font-extrabold tracking-wide uppercase ${
                    item.fulfilled
                      ? "border-fulfilled-green text-fulfilled-green"
                      : "border-stamp-red text-stamp-red-ink"
                  }`}
                >
                  {item.fulfilled ? "✓ Fulfilled" : "Needed"}
                </span>
                <h3 className="mt-1.5 line-clamp-1 text-xs font-medium">{item.title}</h3>
                <p className="mt-1 line-clamp-1 text-[0.7rem] text-ink-soft">{item.description}</p>
                <div className="mt-2 flex items-center justify-between border-t border-dashed border-twine pt-1.5 font-mono text-[0.65rem] text-ink-soft">
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  {item.userId === userId && (
                    <span className="flex gap-2">
                      <Link href={`/wishlist/${item.id}/edit`} className="font-sans text-stamp-blue-ink underline">
                        Edit
                      </Link>
                      <form action={toggleWishlistItemFulfilledAction.bind(null, item.id)}>
                        <button type="submit" className="font-sans underline">
                          {item.fulfilled ? "Unfulfill" : "Fulfill"}
                        </button>
                      </form>
                      <form action={deleteWishlistItemAction.bind(null, item.id)}>
                        <button type="submit" className="font-sans text-stamp-red-ink underline">
                          Delete
                        </button>
                      </form>
                    </span>
                  )}
                </div>
              </div>
            </div>
            </Reveal>
          ))}
        </div>

        {wishPageCount > 1 && (
          <div className="mt-8 flex justify-center gap-4 font-mono text-sm">
            {wishPage > 1 && (
              <Link href={buildHref(sp, { wishPage: String(wishPage - 1) })}>
                ← Previous
              </Link>
            )}
            <span className="text-ink-soft">
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

      <section className="mt-20">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="stamped text-xl">Offers</h2>
          <div className="flex items-center gap-3 font-mono text-xs text-ink-soft">
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
              <Link href="/supplies/new" className="font-bold text-stamp-blue-ink normal-case">
                + Offer an item
              </Link>
            )}
          </div>
        </div>

        <div className="grid gap-3 pt-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {supplies.length === 0 && (
            <p className="text-sm text-ink-soft">No supplies offered yet.</p>
          )}
          {supplies.map((supply, i) => (
            <Reveal key={supply.id} delay={Math.min(i, 8) * 0.04}>
            <div
              className={`relative bg-card shadow-sm transition-transform hover:rotate-0 hover:-translate-y-1 ${rotations[i % rotations.length]} ${supply.fulfilled ? "opacity-60" : ""}`}
            >
              <Punch />
              {supply.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={supply.photoUrl} alt="" className="aspect-[16/9] w-full object-cover" />
              ) : (
                <PlaceholderThumb />
              )}
              <div className="p-2.5">
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`-rotate-2 inline-block border-2 px-1.5 py-0.5 text-[0.55rem] font-extrabold tracking-wide uppercase ${
                      supply.fulfilled
                        ? "border-fulfilled-green text-fulfilled-green"
                        : "border-stamp-blue text-stamp-blue-ink"
                    }`}
                  >
                    {supply.fulfilled ? "✓ Fulfilled" : "Offered"}
                  </span>
                  <span className="shrink-0 text-[0.65rem] text-ink-soft">{supply.category.name}</span>
                </div>
                <h3 className="mt-1.5 line-clamp-1 text-xs font-medium">{supply.name}</h3>
                <p className="mt-1 line-clamp-1 text-[0.7rem] text-ink-soft">{supply.description}</p>
                <p className="mt-1 font-mono text-[0.65rem] text-ink-soft">
                  Qty {supply.quantity} · {supply.condition}
                </p>
                <div className="mt-2 flex items-center justify-between border-t border-dashed border-twine pt-1.5 font-mono text-[0.65rem] text-ink-soft">
                  <span>{new Date(supply.createdAt).toLocaleDateString()}</span>
                  {supply.userId === userId && (
                    <span className="flex gap-2">
                      <Link href={`/supplies/${supply.id}/edit`} className="font-sans text-stamp-blue-ink underline">
                        Edit
                      </Link>
                      <form action={toggleSupplyFulfilledAction.bind(null, supply.id)}>
                        <button type="submit" className="font-sans underline">
                          {supply.fulfilled ? "Unfulfill" : "Fulfill"}
                        </button>
                      </form>
                      <form action={deleteSupplyAction.bind(null, supply.id)}>
                        <button type="submit" className="font-sans text-stamp-red-ink underline">
                          Delete
                        </button>
                      </form>
                    </span>
                  )}
                </div>
              </div>
            </div>
            </Reveal>
          ))}
        </div>

        {supplyPageCount > 1 && (
          <div className="mt-8 flex justify-center gap-4 font-mono text-sm">
            {supplyPage > 1 && (
              <Link href={buildHref(sp, { supplyPage: String(supplyPage - 1) })}>
                ← Previous
              </Link>
            )}
            <span className="text-ink-soft">
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
          <p className="mt-4 text-xs text-ink-soft">
            No categories exist yet — run the seed script so you can offer
            items.
          </p>
        )}
      </section>
    </div>
  );
}
