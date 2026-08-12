"use client";

import { useActionState } from "react";
import { registerAction } from "@/lib/actions/auth";

export default function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, null);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex gap-4">
        <label className="flex flex-1 flex-col gap-1 text-sm">
          First name
          <input
            type="text"
            name="firstName"
            required
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20"
          />
        </label>
        <label className="flex flex-1 flex-col gap-1 text-sm">
          Last name
          <input
            type="text"
            name="lastName"
            required
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20"
          />
        </label>
      </div>
      <label className="flex flex-col gap-1 text-sm">
        Email
        <input
          type="email"
          name="email"
          required
          className="rounded border border-black/20 px-3 py-2 dark:border-white/20"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Phone number
        <input
          type="tel"
          name="phoneNumber"
          placeholder="10 digits, no dashes"
          required
          className="rounded border border-black/20 px-3 py-2 dark:border-white/20"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Password
        <input
          type="password"
          name="password"
          minLength={8}
          required
          className="rounded border border-black/20 px-3 py-2 dark:border-white/20"
        />
      </label>
      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button
        type="submit"
        className="rounded bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black"
      >
        Create account
      </button>
    </form>
  );
}
