import Image from "next/image";
import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div>
      <div className="relative h-56 overflow-hidden sm:h-72">
        <Image src="/hero/auth-bg.jpg" alt="" fill className="object-cover" />
      </div>

      <div className="mx-auto max-w-sm px-4 py-12">
        <h1 className="mb-6 font-brand text-2xl font-bold">
          Create an account
        </h1>
        <RegisterForm />
        <p className="mt-6 text-sm text-black/60 dark:text-white/60">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
