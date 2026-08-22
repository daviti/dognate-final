import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/actions/auth";
import { replyAction } from "@/lib/actions/messages";
import MarkConversationRead from "@/components/MarkConversationRead";
import ReplyForm from "@/components/ReplyForm";

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userId = await requireUserId();

  const conversation = await prisma.conversation.findUnique({
    where: { id },
    include: {
      poster: true,
      inquirer: true,
      wishlistItem: true,
      supply: true,
      messages: { orderBy: { createdAt: "asc" }, include: { fromUser: true } },
    },
  });

  if (!conversation) notFound();
  if (conversation.posterId !== userId && conversation.inquirerId !== userId) {
    redirect("/account/messages");
  }

  const otherUser =
    conversation.posterId === userId ? conversation.inquirer : conversation.poster;
  const isWish = Boolean(conversation.wishlistItem);
  const itemLabel =
    conversation.wishlistItem?.title ?? conversation.supply?.name ?? "a listing";
  const action = replyAction.bind(null, id);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <MarkConversationRead conversationId={id} />
      <Link
        href="/account/messages"
        className="mb-6 inline-block text-sm underline decoration-twine"
      >
        ← All messages
      </Link>
      <p className="text-xs tracking-widest text-ink-soft uppercase">
        <span className={isWish ? "text-stamp-red" : "text-stamp-blue"}>
          {isWish ? "Wish" : "Offer"}
        </span>{" "}
        · {itemLabel}
      </p>
      <h1 className="stamped mt-1 mb-8 text-3xl">
        {otherUser.firstName} {otherUser.lastName}
      </h1>

      <ul className="flex flex-col gap-4">
        {conversation.messages.map((msg) => {
          const mine = msg.fromUserId === userId;
          return (
            <li
              key={msg.id}
              className={`relative bg-card p-4 shadow-sm ${
                mine
                  ? "ml-8 border-l-2 border-stamp-red"
                  : "mr-8 border-l-2 border-stamp-blue"
              }`}
            >
              <p className="text-xs font-medium text-ink-soft">
                {mine ? "You" : msg.fromUser.firstName}
              </p>
              <p className="mt-1 text-sm">{msg.message}</p>
              <p className="mt-2 font-mono text-xs text-ink-soft">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </li>
          );
        })}
      </ul>

      <div className="relative mt-8 bg-card p-6 shadow-sm">
        <div className="absolute -top-2 left-6 h-4 w-4 rounded-full border border-hole bg-hole shadow-inner" />
        <ReplyForm action={action} />
      </div>
    </div>
  );
}
