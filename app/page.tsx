import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PolaroidPhoto from "@/components/PolaroidPhoto";
import Reveal from "@/components/Reveal";
import AnimatedStat from "@/components/AnimatedStat";

export default async function HomePage() {
  const [userCount, supplyCount, wishCount] = await Promise.all([
    prisma.user.count(),
    prisma.supply.count(),
    prisma.wishlistItem.count(),
  ]);

  return (
    <div>
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-xl">
            <p className="mb-5 flex items-center gap-2.5 text-xs tracking-widest text-stamp-red-ink uppercase">
              <span className="inline-block h-0.5 w-6 bg-stamp-red" />A
              community supply exchange
            </p>
            <h1 className="stamped text-5xl leading-[0.98] sm:text-7xl">
              Supplies needed.
              <br />
              <span className="text-stamp-red">Supplies given.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-ink-soft">
              Post what an animal in your care needs. Offer what&apos;s
              sitting unused in yours. No middleman, no fees — just a board
              where needs meet spares.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Link
                href="/board"
                className="stamp-btn rounded-sm border-2 border-stamp-red px-6 py-3.5 text-sm font-bold tracking-widest text-stamp-red-ink uppercase hover:bg-stamp-red hover:text-card"
              >
                Browse the board →
              </Link>
              <Link
                href="/wishlist/new"
                className="text-sm underline decoration-twine underline-offset-4"
              >
                Post a wish or an offer
              </Link>
            </div>
          </div>

          <div className="relative hidden h-64 w-64 shrink-0 sm:block">
            <div className="absolute top-0 left-0">
              <PolaroidPhoto
                src="/photos/polaroid-1.jpg"
                alt="Golden retriever in a field of dandelions"
                rotate="-rotate-6"
                pinColor="bg-stamp-red"
              />
            </div>
            <div className="absolute top-16 left-24 z-10">
              <PolaroidPhoto
                src="/photos/polaroid-2.jpg"
                alt="Happy corgi outdoors"
                rotate="rotate-3"
                pinColor="bg-stamp-blue"
                delay={0.15}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-paper-deep px-6 py-20">
        <Reveal className="mx-auto max-w-3xl">
          <h2 className="stamped mb-2 text-2xl">The board, in short</h2>
          <p className="mb-10 max-w-xl text-ink-soft">
            Every wish and offer is real — posted by someone caring for an
            animal, right now.
          </p>
          <div className="grid grid-cols-3 border-t border-foreground">
            <div className="border-r border-dashed border-twine px-4 py-6 first:pl-0">
              <AnimatedStat value={wishCount} label="Wishes posted" />
            </div>
            <div className="border-r border-dashed border-twine px-4 py-6">
              <AnimatedStat value={supplyCount} label="Supplies offered" />
            </div>
            <div className="px-4 py-6">
              <AnimatedStat value={userCount} label="Members" />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <Reveal className="grid items-center gap-10 sm:grid-cols-[auto_1fr]">
          <div className="mx-auto sm:mx-0">
            <PolaroidPhoto
              src="/photos/polaroid-3.jpg"
              alt="Dog resting on a bed surrounded by supplies: toys, bowls, a leash, and a harness"
              rotate="rotate-2"
              pinColor="bg-brand-brown"
            />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="stamped text-3xl">
              The only thing they need{" "}
              <span className="text-stamp-blue">is us.</span>
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-5 sm:justify-start">
              <Link
                href="/register"
                className="stamp-btn rounded-sm border-2 border-brand-brown px-6 py-3 text-sm font-bold tracking-widest text-brand-brown uppercase hover:bg-brand-brown hover:text-card"
              >
                Create an account
              </Link>
              <Link
                href="/why-donate"
                className="text-sm underline decoration-twine underline-offset-4"
              >
                Why donate?
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
