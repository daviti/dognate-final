import Link from "next/link";
import { auth } from "@/auth";
import { logoutAction } from "@/lib/actions/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <nav className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-lg font-semibold">
          Dognate
        </Link>
        <div className="flex items-center gap-4 text-sm">
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
              <Link href="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
