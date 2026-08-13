import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const callbackUrl =
    typeof params.callbackUrl === "string" ? params.callbackUrl : undefined;

  return (
    <div>
      <div className="relative h-56 overflow-hidden sm:h-72">
        <Image src="/hero/auth-bg.jpg" alt="" fill className="object-cover" />
      </div>

      <div className="mx-auto max-w-sm px-4 py-12">
        <h1 className="mb-6 font-brand text-2xl font-bold">Log in</h1>
        <LoginForm callbackUrl={callbackUrl} />
        <p className="mt-6 text-sm text-black/60 dark:text-white/60">
          No account yet?{" "}
          <Link href="/register" className="underline">
            Register
          </Link>
        </p>

        <blockquote className="mt-12 border-l-2 border-brand-green pl-4 text-sm text-black/70 dark:text-white/70">
          &quot;My greatest joy is caring for my dogs and feeling their love
          in return.&quot;
          <footer className="mt-1 text-black/50 dark:text-white/50">
            — David Ortiz, Founder Dognate
          </footer>
        </blockquote>
      </div>
    </div>
  );
}
