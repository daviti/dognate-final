import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="stamped mb-6 text-3xl">Create an account</h1>
      <div className="relative bg-card p-8 shadow-sm">
        <div className="absolute -top-2 left-8 h-4 w-4 rounded-full border border-hole bg-hole shadow-inner" />
        <RegisterForm />
      </div>
      <p className="mt-6 text-sm text-ink-soft">
        Already have an account?{" "}
        <Link href="/login" className="underline decoration-twine">
          Log in
        </Link>
      </p>
    </div>
  );
}
