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
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="stamped mb-6 text-3xl">Log in</h1>
      <div className="relative bg-card p-8 shadow-sm">
        <div className="absolute -top-2 left-8 h-4 w-4 rounded-full border border-hole bg-hole shadow-inner" />
        <LoginForm callbackUrl={callbackUrl} />
      </div>
      <p className="mt-6 text-sm text-ink-soft">
        No account yet?{" "}
        <Link href="/register" className="underline decoration-twine">
          Register
        </Link>
      </p>

      <blockquote className="mt-12 border-l-2 border-stamp-red pl-4 text-sm text-ink-soft">
        &quot;My greatest joy is caring for my dogs and feeling their love in
        return.&quot;
        <footer className="mt-1 text-ink-soft/70">
          — David Ortiz, Founder Dognate
        </footer>
      </blockquote>
    </div>
  );
}
