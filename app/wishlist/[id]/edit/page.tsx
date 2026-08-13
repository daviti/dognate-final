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
      <h1 className="mb-6 font-brand text-2xl font-bold">Edit wish</h1>
      <WishlistForm action={updateAction} defaultValues={item} />
      <form action={deleteAction} className="mt-6">
        <button type="submit" className="text-sm text-red-600 underline">
          Delete this wish
        </button>
      </form>
    </div>
  );
}
