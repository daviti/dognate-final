import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { logoutAction } from "@/lib/actions/auth";

export default async function TopHeader() {
  const session = await auth();

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 bg-black/[0.03] px-6 py-5 dark:bg-white/[0.03]">
      <Link
        href="/"
        className="flex items-center font-brand text-3xl font-extrabold tracking-tight"
      >
        D
        <span className="relative mx-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-green">
          <Image src="/brand/paw.svg" alt="" width={16} height={16} className="h-4 w-4 invert" />
        </span>
        GNATE
      </Link>
      <div className="flex flex-wrap items-center gap-5 text-sm">
        <Link href="/board" className="font-medium text-brand-green">
          Board
        </Link>
        {session?.user ? (
          <>
            <Link href="/account/addresses">My addresses</Link>
            <form action={logoutAction}>
              <button type="submit" className="cursor-pointer">
                Log out
              </button>
            </form>
          </>
        ) : (
          <>
            <Link href="/login">Log in</Link>
            <Link
              href="/register"
              className="rounded-full bg-brand-green px-4 py-1.5 text-white"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
