import { prisma } from "@/lib/prisma";
import { requireUserId } from "@/lib/actions/auth";
import { createAddressAction, deleteAddressAction } from "@/lib/actions/addresses";
import AddressForm from "@/components/AddressForm";

export default async function AddressesPage() {
  const userId = await requireUserId();
  const addresses = await prisma.address.findMany({
    where: { userId },
    orderBy: { city: "asc" },
  });

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="stamped mb-6 text-3xl">My addresses</h1>

      <ul className="mb-8 flex flex-col gap-2">
        {addresses.length === 0 && (
          <li className="text-sm text-ink-soft">
            No addresses yet.
          </li>
        )}
        {addresses.map((address) => (
          <li
            key={address.id}
            className="flex items-center justify-between border border-black/10 bg-card px-3 py-2 text-sm"
          >
            <span>
              {address.city}, {address.state} {address.zipcode}
            </span>
            <form action={deleteAddressAction.bind(null, address.id)}>
              <button type="submit" className="text-stamp-red-ink underline">
                Remove
              </button>
            </form>
          </li>
        ))}
      </ul>

      <h2 className="stamped mb-4 text-lg">Add an address</h2>
      <AddressForm action={createAddressAction} />
    </div>
  );
}
