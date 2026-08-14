import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/actions/auth";

export default async function MessagesPage() {
  const userId = await requireUserId();

  const messages = await prisma.message.findMany({
    where: {
      OR: [{ wishlistItem: { userId } }, { supply: { userId } }],
    },
    include: { fromUser: true, wishlistItem: true, supply: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="stamped mb-6 text-3xl">My messages</h1>

      <ul className="flex flex-col gap-4">
        {messages.length === 0 && (
          <li className="text-sm text-ink-soft">
            No messages yet — when someone connects about one of your wishes
            or offers, it&apos;ll show up here.
          </li>
        )}
        {messages.map((msg) => {
          const item = msg.wishlistItem ?? msg.supply;
          const itemLabel = msg.wishlistItem
            ? msg.wishlistItem.title
            : msg.supply?.name;
          if (!item) return null;
          return (
            <li key={msg.id} className="relative bg-card p-5 shadow-sm">
              <div className="absolute -top-2 left-6 h-4 w-4 rounded-full border border-hole bg-hole shadow-inner" />
              <p className="text-xs tracking-widest text-ink-soft uppercase">
                About &quot;{itemLabel}&quot;
              </p>
              <p className="mt-2 font-medium">
                {msg.fromUser.firstName} {msg.fromUser.lastName}
              </p>
              <a
                href={`mailto:${msg.fromUser.email}`}
                className="text-sm text-stamp-blue-ink underline"
              >
                {msg.fromUser.email}
              </a>
              <p className="mt-3 text-sm text-ink-soft">{msg.message}</p>
              <p className="mt-3 font-mono text-xs text-ink-soft">
                {new Date(msg.createdAt).toLocaleString()}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
