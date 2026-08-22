import { prisma } from "@/lib/prisma";

const benefits = [
  {
    title: "Benefits of sharing",
    body: "Sharing is gaining prominence as an addition to the traditional, linear economy — it can lead to happier, healthier, more sustainable lifestyles by putting resources that would otherwise go to waste directly to use.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 8a3 3 0 1 0-2.8-4H15A3 3 0 1 0 12 8v.2L7.9 10.4a3 3 0 1 0 0 3.2L12 15.8V16a3 3 0 1 0 3-3h.2a3 3 0 1 0 2.8-4"
      />
    ),
  },
  {
    title: "Benefits of donating",
    body: "Donating tends to make people more informed about the causes they give to. You end up learning about issues you might not have otherwise, which can put you in a better position to help others understand them too.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"
      />
    ),
  },
  {
    title: "Benefits of volunteering",
    body: "Volunteers are often the glue that holds a community together. It's a two-way street — helping a cause you care about while making connections and expanding your own network along the way.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.7 6.3a2 2 0 0 1 2.8 2.8l-7.9 7.9-4.2 1.1 1.1-4.2 7.9-7.9Z"
      />
    ),
  },
];

export default async function AboutPage() {
  const [userCount, supplyCount, wishCount] = await Promise.all([
    prisma.user.count(),
    prisma.supply.count(),
    prisma.wishlistItem.count(),
  ]);

  return (
    <div>
      <div className="mx-auto max-w-3xl px-6 pt-14 pb-10">
        <h1 className="stamped text-4xl">
          About <span className="text-stamp-red">Dognate</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          Dognate was created with &quot;sharing is the new buying&quot; in
          mind. A common pain point for shelters and low-income pet owners is
          a general lack of resources — the sharing economy offers a new,
          creative way to think about locating, accessing, and trading them.
        </p>
      </div>

      <div className="grid gap-8 border-y border-black/10 bg-paper-deep px-6 py-14 sm:grid-cols-3">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="mx-auto max-w-xs">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              className="h-7 w-7 text-stamp-red"
            >
              {benefit.icon}
            </svg>
            <h3 className="mt-3 font-medium">{benefit.title}</h3>
            <p className="mt-2 text-sm text-ink-soft">{benefit.body}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="grid grid-cols-3 border-t border-foreground">
          <div className="border-r border-dashed border-twine px-4 py-6 first:pl-0">
            <p className="font-mono text-3xl font-bold">{wishCount}</p>
            <p className="mt-1 text-xs tracking-wide text-ink-soft uppercase">
              Wishes posted
            </p>
          </div>
          <div className="border-r border-dashed border-twine px-4 py-6">
            <p className="font-mono text-3xl font-bold">{supplyCount}</p>
            <p className="mt-1 text-xs tracking-wide text-ink-soft uppercase">
              Supplies offered
            </p>
          </div>
          <div className="px-4 py-6">
            <p className="font-mono text-3xl font-bold">{userCount}</p>
            <p className="mt-1 text-xs tracking-wide text-ink-soft uppercase">
              Members
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10">
        <h2 className="stamped text-3xl">
          Where it <span className="text-stamp-blue">started</span>
        </h2>
        <hr className="my-4 border-black/10" />
        <p className="max-w-2xl text-ink-soft">
          Dognate started during the winter of 2013–2014 at Coding Dojo in
          Mountain View, California, built with a few classmates as a class
          project. That winter, a cold front hit the San Francisco Bay Area
          hard, and the Vallejo animal shelter — most of its operations
          outdoors — was short on blankets, bedding, and anything else that
          could keep the dogs warm. That&apos;s what led to building this, so
          shelters and organizations like it could get what they actually
          needed.
        </p>
        <p className="mt-4 max-w-2xl text-ink-soft">
          It&apos;s not a class project anymore. I&apos;ve kept building on
          Dognate on my own since — this version is a full rewrite on modern
          technology, with the goal of making it an actual site people can
          use, not a demo.
        </p>

        <div className="mt-10 max-w-sm">
          <div className="relative bg-card p-5 shadow-sm">
            <div className="absolute -top-2 left-6 h-4 w-4 rounded-full border border-hole bg-hole shadow-inner" />
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-brand-brown font-mono text-sm font-bold text-brand-brown">
                DO
              </div>
              <div>
                <p className="font-medium">David Ortiz</p>
                <p className="text-sm text-ink-soft">San Francisco, CA</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-ink-soft">
              Founder &amp; developer
            </p>
            <a
              href="http://www.linkedin.com/pub/david-ortiz/35/517/898/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-stamp-blue-ink underline decoration-twine"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 bg-paper-deep px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <h2 className="stamped text-3xl">
            What&apos;s <span className="text-brand-brown">next</span>
          </h2>
          <p className="mt-4 max-w-2xl text-ink-soft">
            Right now, Dognate is a straightforward exchange board — post
            what an animal in your care needs, offer what you can spare,
            connect directly. Next up is a way to purchase supplies through
            the site too, for when nobody&apos;s currently offering what
            someone needs.
          </p>
        </div>
      </div>
    </div>
  );
}
