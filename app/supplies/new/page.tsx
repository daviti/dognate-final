import { prisma } from "@/lib/prisma";
import SupplyForm from "@/components/SupplyForm";
import { createSupplyAction } from "@/lib/actions/supplies";

export default async function NewSupplyPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="border-b border-black/10 bg-paper-deep py-14">
      <div className="mx-auto max-w-md px-6">
        <p className="text-xs font-bold tracking-widest text-stamp-blue-ink uppercase">
          Offer
        </p>
        <h1 className="stamped mt-1 text-3xl">Make an offer</h1>
        <div className="relative mt-6 bg-card p-8 shadow-sm">
          <div className="absolute -top-2 left-8 h-4 w-4 rounded-full border border-hole bg-hole shadow-inner" />
          <SupplyForm action={createSupplyAction} categories={categories} />
        </div>
      </div>
    </div>
  );
}
