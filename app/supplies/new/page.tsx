import { prisma } from "@/lib/prisma";
import SupplyForm from "@/components/SupplyForm";
import { createSupplyAction } from "@/lib/actions/supplies";

export default async function NewSupplyPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="mb-6 text-2xl font-semibold">Offer an item</h1>
      <SupplyForm action={createSupplyAction} categories={categories} />
    </div>
  );
}
