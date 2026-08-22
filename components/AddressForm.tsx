"use client";

import { useActionState, useEffect, useRef } from "react";
import SubmitButton from "@/components/SubmitButton";
import type { AddressActionState } from "@/lib/actions/addresses";

export default function AddressForm({
  action,
}: {
  action: (
    prevState: AddressActionState,
    formData: FormData,
  ) => Promise<AddressActionState>;
}) {
  const [state, formAction] = useActionState(action, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state && "success" in state) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm">
        City
        <input
          type="text"
          name="city"
          maxLength={100}
          required
          className="border border-black/20 bg-card px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        State
        <input
          type="text"
          name="state"
          maxLength={100}
          required
          className="border border-black/20 bg-card px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Zip code
        <input
          type="text"
          name="zipcode"
          required
          className="border border-black/20 bg-card px-3 py-2"
        />
      </label>
      {state && "error" in state && (
        <p className="text-sm text-stamp-red-ink">{state.error}</p>
      )}
      <SubmitButton>Add address</SubmitButton>
    </form>
  );
}
