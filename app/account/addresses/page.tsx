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
      <h1 className="mb-6 text-2xl font-semibold">My addresses</h1>

      <ul className="mb-8 flex flex-col gap-2">
        {addresses.length === 0 && (
          <li className="text-sm text-black/60 dark:text-white/60">
            No addresses yet.
          </li>
        )}
        {addresses.map((address) => (
          <li
            key={address.id}
            className="flex items-center justify-between rounded border border-black/10 px-3 py-2 text-sm dark:border-white/10"
          >
            <span>
              {address.city}, {address.state} {address.zipcode}
            </span>
            <form action={deleteAddressAction.bind(null, address.id)}>
              <button type="submit" className="text-red-600 underline">
                Remove
              </button>
            </form>
          </li>
        ))}
      </ul>

      <h2 className="mb-4 text-lg font-medium">Add an address</h2>
      <AddressForm action={createAddressAction} />
    </div>
  );
}
