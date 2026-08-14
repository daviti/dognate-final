import WishlistForm from "@/components/WishlistForm";
import { createWishlistItemAction } from "@/lib/actions/wishlist";

export default function NewWishlistItemPage() {
  return (
    <div className="border-b border-black/10 bg-paper-deep py-14">
      <div className="mx-auto max-w-md px-6">
        <p className="text-xs font-bold tracking-widest text-stamp-red-ink uppercase">
          Wish
        </p>
        <h1 className="stamped mt-1 text-3xl">Make a wish</h1>
        <div className="relative mt-6 bg-card p-8 shadow-sm">
          <div className="absolute -top-2 left-8 h-4 w-4 rounded-full border border-hole bg-hole shadow-inner" />
          <WishlistForm action={createWishlistItemAction} />
        </div>
      </div>
    </div>
  );
}
