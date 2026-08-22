import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { logoutAction } from "@/lib/actions/auth";
import { prisma } from "@/lib/prisma";

export default async function Nav() {
  const session = await auth();
  const userId = session?.user?.id;
  const unreadCount = userId
    ? await prisma.message.count({
        where: {
          readAt: null,
          fromUserId: { not: userId },
          conversation: { OR: [{ posterId: userId }, { inquirerId: userId }] },
        },
      })
    : 0;

  return (
    <header className="mx-auto max-w-6xl px-6 pt-6">
      <nav className="flex flex-wrap items-center justify-between gap-4">
        <Link href="/">
          <Image
            src="/brand/logo.png"
            alt="Dognate"
            width={190}
            height={44}
            priority
            className="h-9 w-auto"
          />
        </Link>
        <div className="flex flex-wrap items-center gap-6 text-xs tracking-widest uppercase">
          <Link href="/why-donate" className="border-b-2 border-transparent pb-0.5 hover:border-stamp-red">
            Why Donate
          </Link>
          <Link href="/about" className="border-b-2 border-transparent pb-0.5 hover:border-stamp-red">
            About
          </Link>
          <Link href="/board" className="border-b-2 border-transparent pb-0.5 hover:border-stamp-red">
            The Board
          </Link>
          <Link href="/contact" className="border-b-2 border-transparent pb-0.5 hover:border-stamp-red">
            Contact
          </Link>
          {session?.user ? (
            <>
              <Link href="/account/messages" className="flex items-center gap-1.5 border-b-2 border-transparent pb-0.5 hover:border-stamp-red">
                Messages
                {unreadCount > 0 && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-stamp-red px-1 text-[10px] font-bold text-card normal-case">
                    {unreadCount}
                  </span>
                )}
              </Link>
              <Link href="/account/addresses" className="border-b-2 border-transparent pb-0.5 hover:border-stamp-red">
                My addresses
              </Link>
              <form action={logoutAction}>
                <button type="submit" className="cursor-pointer border-b-2 border-transparent pb-0.5 hover:border-stamp-red">
                  Log out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="border-b-2 border-transparent pb-0.5 hover:border-stamp-red">
                Log in
              </Link>
              <Link
                href="/register"
                className="stamp-btn rounded-sm border-2 border-stamp-red px-4 py-2 font-bold text-stamp-red-ink normal-case tracking-normal hover:bg-stamp-red hover:text-card"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
