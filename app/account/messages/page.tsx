import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/actions/auth";

export default async function MessagesPage() {
  const userId = await requireUserId();

  const conversations = await prisma.conversation.findMany({
    where: { OR: [{ posterId: userId }, { inquirerId: userId }] },
    include: {
      poster: true,
      inquirer: true,
      wishlistItem: true,
      supply: true,
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
      _count: {
        select: {
          messages: { where: { readAt: null, fromUserId: { not: userId } } },
        },
      },
    },
  });

  conversations.sort((a, b) => {
    const aTime = a.messages[0]?.createdAt.getTime() ?? 0;
    const bTime = b.messages[0]?.createdAt.getTime() ?? 0;
    return bTime - aTime;
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="stamped mb-6 text-3xl">My messages</h1>

      <ul className="flex flex-col gap-4">
        {conversations.length === 0 && (
          <li className="text-sm text-ink-soft">
            No conversations yet — when you connect about a wish or offer, or
            someone connects with you, it&apos;ll show up here.
          </li>
        )}
        {conversations.map((conversation) => {
          const otherUser =
            conversation.posterId === userId
              ? conversation.inquirer
              : conversation.poster;
          const isWish = Boolean(conversation.wishlistItem);
          const itemLabel =
            conversation.wishlistItem?.title ?? conversation.supply?.name ?? "a listing";
          const lastMessage = conversation.messages[0];
          const unreadCount = conversation._count.messages;

          return (
            <li key={conversation.id}>
              <Link
                href={`/account/messages/${conversation.id}`}
                className="relative block bg-card p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="absolute -top-2 left-6 h-4 w-4 rounded-full border border-hole bg-hole shadow-inner" />
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs tracking-widest text-ink-soft uppercase">
                    <span className={isWish ? "text-stamp-red" : "text-stamp-blue"}>
                      {isWish ? "Wish" : "Offer"}
                    </span>{" "}
                    · {itemLabel}
                  </p>
                  {unreadCount > 0 && (
                    <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-stamp-red px-1.5 text-xs font-bold text-card">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <p
                  className={`mt-2 ${unreadCount > 0 ? "font-bold" : "font-medium"}`}
                >
                  {otherUser.firstName} {otherUser.lastName}
                </p>
                {lastMessage && (
                  <p className="mt-2 line-clamp-2 text-sm text-ink-soft">
                    {lastMessage.message}
                  </p>
                )}
                {lastMessage && (
                  <p className="mt-3 font-mono text-xs text-ink-soft">
                    {new Date(lastMessage.createdAt).toLocaleString()}
                  </p>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
