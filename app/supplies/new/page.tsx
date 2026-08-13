import Image from "next/image";
import { prisma } from "@/lib/prisma";
import SupplyForm from "@/components/SupplyForm";
import { createSupplyAction } from "@/lib/actions/supplies";

export default async function NewSupplyPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <div className="relative flex h-40 items-end overflow-hidden">
        <Image src="/hero/hero-secondary.png" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <h1 className="relative z-10 px-6 pb-6 font-brand text-3xl font-extrabold text-white">
          WISH <span className="text-brand-green">OFFER</span> CONNECT
        </h1>
      </div>

      <div className="mx-auto max-w-md -mt-8 mb-16 bg-white p-8 shadow-lg dark:bg-black">
        <p className="text-xs font-medium tracking-wide text-brand-green uppercase">
          Offer
        </p>
        <h2 className="mt-1 font-brand text-2xl font-bold tracking-wide uppercase">
          Make an offer
        </h2>
        <hr className="my-4 border-black/10 dark:border-white/10" />
        <SupplyForm action={createSupplyAction} categories={categories} />
      </div>
    </div>
  );
}
