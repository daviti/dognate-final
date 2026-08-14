import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import WishlistForm from "@/components/WishlistForm";
import { deleteWishlistItemAction, updateWishlistItemAction } from "@/lib/actions/wishlist";

export default async function EditWishlistItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const item = await prisma.wishlistItem.findUnique({ where: { id } });

  if (!item || item.userId !== session?.user?.id) {
    notFound();
  }

  const updateAction = updateWishlistItemAction.bind(null, id);
  const deleteAction = deleteWishlistItemAction.bind(null, id);

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="stamped mb-6 text-2xl">Edit wish</h1>
      <div className="relative bg-card p-8 shadow-sm">
        <div className="absolute -top-2 left-8 h-4 w-4 rounded-full border border-hole bg-hole shadow-inner" />
        <WishlistForm action={updateAction} defaultValues={item} />
      </div>
      <form action={deleteAction} className="mt-6">
        <button type="submit" className="text-sm text-stamp-red-ink underline">
          Delete this wish
        </button>
      </form>
    </div>
  );
}
