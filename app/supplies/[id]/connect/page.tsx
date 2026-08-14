import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/actions/auth";
import { sendSupplyMessageAction } from "@/lib/actions/messages";
import ConnectForm from "@/components/ConnectForm";

export default async function ConnectAboutSupplyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = await requireUserId();
  const supply = await prisma.supply.findUnique({ where: { id } });

  if (!supply) notFound();
  if (supply.userId === userId) redirect(`/board`);

  const action = sendSupplyMessageAction.bind(null, id);

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <p className="text-xs font-bold tracking-widest text-stamp-blue-ink uppercase">
        Offer
      </p>
      <h1 className="stamped mt-1 text-3xl">Connect</h1>
      <div className="mt-4 border-l-2 border-stamp-blue pl-4 text-sm text-ink-soft">
        <p className="font-medium text-foreground">{supply.name}</p>
        <p className="mt-1">{supply.description}</p>
      </div>
      <div className="relative mt-6 bg-card p-8 shadow-sm">
        <div className="absolute -top-2 left-8 h-4 w-4 rounded-full border border-hole bg-hole shadow-inner" />
        <ConnectForm action={action} />
      </div>
    </div>
  );
}
