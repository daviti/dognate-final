"use client";

import { useActionState } from "react";
import SubmitButton from "@/components/SubmitButton";
import { registerAction } from "@/lib/actions/auth";

export default function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, null);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex gap-4">
        <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
          First name
          <input
            type="text"
            name="firstName"
            maxLength={100}
            required
            className="w-full border border-black/20 bg-card px-3 py-2"
          />
        </label>
        <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
          Last name
          <input
            type="text"
            name="lastName"
            maxLength={100}
            required
            className="w-full border border-black/20 bg-card px-3 py-2"
          />
        </label>
      </div>
      <label className="flex flex-col gap-1 text-sm">
        Email
        <input
          type="email"
          name="email"
          maxLength={255}
          required
          className="w-full border border-black/20 bg-card px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Phone number
        <input
          type="tel"
          name="phoneNumber"
          placeholder="10 digits, no dashes"
          required
          className="w-full border border-black/20 bg-card px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Password
        <input
          type="password"
          name="password"
          maxLength={72}
          minLength={8}
          required
          className="w-full border border-black/20 bg-card px-3 py-2"
        />
      </label>
      {state?.error && <p className="text-sm text-stamp-red-ink">{state.error}</p>}
      <SubmitButton>Create account</SubmitButton>
    </form>
  );
}
