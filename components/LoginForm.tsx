"use client";

import { useActionState } from "react";
import SubmitButton from "@/components/SubmitButton";
import { loginAction } from "@/lib/actions/auth";

export default function LoginForm({ callbackUrl }: { callbackUrl?: string }) {
  const [state, formAction] = useActionState(loginAction, null);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="callbackUrl" value={callbackUrl ?? "/"} />
      <label className="flex flex-col gap-1 text-sm">
        Email
        <input
          type="email"
          name="email"
          maxLength={255}
          required
          className="border border-black/20 bg-card px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Password
        <input
          type="password"
          name="password"
          maxLength={72}
          required
          className="border border-black/20 bg-card px-3 py-2"
        />
      </label>
      {state?.error && <p className="text-sm text-stamp-red-ink">{state.error}</p>}
      <SubmitButton>Log in</SubmitButton>
    </form>
  );
}
