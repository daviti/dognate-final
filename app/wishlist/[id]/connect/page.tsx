import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/actions/auth";
import { sendWishlistMessageAction } from "@/lib/actions/messages";
import ConnectForm from "@/components/ConnectForm";

export default async function ConnectAboutWishPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = await requireUserId();
  const item = await prisma.wishlistItem.findUnique({ where: { id } });

  if (!item) notFound();
  if (item.userId === userId) redirect(`/board`);

  const action = sendWishlistMessageAction.bind(null, id);

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <p className="text-xs font-bold tracking-widest text-stamp-red-ink uppercase">
        Wish
      </p>
      <h1 className="stamped mt-1 text-3xl">Connect</h1>
      <div className="mt-4 border-l-2 border-stamp-red pl-4 text-sm text-ink-soft">
        <p className="font-medium text-foreground">{item.title}</p>
        <p className="mt-1">{item.description}</p>
      </div>
      <div className="relative mt-6 bg-card p-8 shadow-sm">
        <div className="absolute -top-2 left-8 h-4 w-4 rounded-full border border-hole bg-hole shadow-inner" />
        <ConnectForm action={action} />
      </div>
    </div>
  );
}
