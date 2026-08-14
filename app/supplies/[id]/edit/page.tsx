import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import SupplyForm from "@/components/SupplyForm";
import { deleteSupplyAction, updateSupplyAction } from "@/lib/actions/supplies";

export default async function EditSupplyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const [supply, categories] = await Promise.all([
    prisma.supply.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!supply || supply.userId !== session?.user?.id) {
    notFound();
  }

  const updateAction = updateSupplyAction.bind(null, id);
  const deleteAction = deleteSupplyAction.bind(null, id);

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="stamped mb-6 text-2xl">Edit offer</h1>
      <div className="relative bg-card p-8 shadow-sm">
        <div className="absolute -top-2 left-8 h-4 w-4 rounded-full border border-hole bg-hole shadow-inner" />
        <SupplyForm action={updateAction} categories={categories} defaultValues={supply} />
      </div>
      <form action={deleteAction} className="mt-6">
        <button type="submit" className="text-sm text-stamp-red-ink underline">
          Delete this offer
        </button>
      </form>
    </div>
  );
}
