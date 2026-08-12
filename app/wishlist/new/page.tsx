import WishlistForm from "@/components/WishlistForm";
import { createWishlistItemAction } from "@/lib/actions/wishlist";

export default function NewWishlistItemPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-6 text-2xl font-semibold">Post a wish</h1>
      <WishlistForm action={createWishlistItemAction} />
    </div>
  );
}
