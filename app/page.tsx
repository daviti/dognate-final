import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const [userCount, supplyCount, wishCount] = await Promise.all([
    prisma.user.count(),
    prisma.supply.count(),
    prisma.wishlistItem.count(),
  ]);

  return (
    <div>
      <section className="relative flex min-h-[560px] items-center justify-center overflow-hidden text-center">
        <Image
          src="/hero/hero-main.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 px-4 text-white">
          <h1 className="font-brand text-4xl font-extrabold tracking-tight sm:text-6xl">
            LET&apos;S <span className="text-brand-green">DOGNATE</span>.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg">
            The easiest way to donate or exchange supplies for animals in
            need.
          </p>
          <Link
            href="/why-donate"
            className="mt-8 inline-block rounded border border-white px-6 py-3 text-sm font-medium hover:bg-white hover:text-black"
          >
            Learn More
          </Link>
        </div>
      </section>

      <section className="flex flex-wrap items-center justify-between gap-4 bg-brand-green px-6 py-8 text-white">
        <p className="text-lg">If you&apos;d like to donate.</p>
        <Link
          href="/board"
          className="rounded border border-white px-6 py-3 text-sm font-medium hover:bg-white hover:text-brand-green"
        >
          Browse the board
        </Link>
      </section>

      <section className="relative flex min-h-[420px] items-center overflow-hidden">
        <Image
          src="/hero/hero-secondary.png"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 px-6 py-10 sm:px-16">
          <h2 className="font-brand text-2xl font-bold text-white sm:text-3xl">
            <span className="text-brand-green">They need our love</span>
            <br />
            and care.
          </h2>
          <p className="mt-2 text-lg font-medium text-white">
            It&apos;s so easy to make them happy!
          </p>
          <Link
            href="/why-donate"
            className="mt-6 inline-block rounded border border-white px-5 py-2.5 text-sm font-medium text-white hover:bg-white hover:text-black"
          >
            Learn More
          </Link>
        </div>
      </section>

      <section className="bg-brand-brown px-6 py-16 text-center text-white">
        <p className="mx-auto max-w-2xl text-xl">
          <span className="text-brand-green">
            The only and best thing we can do for them,
          </span>
          <br />
          is to give them a good and happy life.
        </p>
        <Link
          href="/team"
          className="mt-6 inline-block rounded border border-white px-5 py-2.5 text-sm font-medium hover:bg-white hover:text-black"
        >
          Learn More
        </Link>
      </section>

      <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden text-center">
        <Image src="/hero/hero-cta.jpg" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 px-4 text-white">
          <h2 className="font-brand text-2xl font-bold sm:text-3xl">
            <span className="text-brand-green">Dognate</span> so far.
          </h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-10">
            <div>
              <p className="font-brand text-4xl font-bold">{wishCount}</p>
              <p className="text-sm opacity-80">wishes posted</p>
            </div>
            <div>
              <p className="font-brand text-4xl font-bold">{supplyCount}</p>
              <p className="text-sm opacity-80">supplies offered</p>
            </div>
            <div>
              <p className="font-brand text-4xl font-bold">{userCount}</p>
              <p className="text-sm opacity-80">members</p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register"
              className="rounded-full bg-brand-green px-6 py-3 text-sm font-medium"
            >
              Create an account
            </Link>
            <Link
              href="/board"
              className="rounded border border-white px-6 py-3 text-sm font-medium hover:bg-white hover:text-black"
            >
              Browse the board
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
