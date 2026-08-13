import Image from "next/image";
import { prisma } from "@/lib/prisma";

const team = [
  {
    name: "David Ortiz",
    location: "San Francisco, CA",
    title: "Dognate Founder, Jr. Front End Web Developer",
    linkedin: "http://www.linkedin.com/pub/david-ortiz/35/517/898/",
  },
  {
    name: "Will Russell",
    location: "Redding, CA",
    title: "Independent Contractor, Full Stack Web Developer",
    linkedin: "http://www.linkedin.com/pub/william-russell/75/b36/109",
  },
  {
    name: "Chung Man Kim",
    location: "San Francisco, CA",
    title: "Full Stack Web Developer",
    linkedin: "https://www.linkedin.com/in/chungmankim",
  },
  {
    name: "Nicandro Martinez",
    location: "Guadalajara Jal, Mexico",
    title: "Jr. Front End Web Developer",
    linkedin: "http://www.linkedin.com/pub/nicandro-martinez-sotelo/23/a12/952",
  },
];

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

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export default async function TeamPage() {
  const [userCount, supplyCount, wishCount] = await Promise.all([
    prisma.user.count(),
    prisma.supply.count(),
    prisma.wishlistItem.count(),
  ]);

  return (
    <div>
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="font-brand text-4xl font-extrabold">
          ABOUT <span className="text-brand-green">US</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-black/70 dark:text-white/70">
          Dognate was created with &quot;sharing is the new buying&quot; in
          mind. A common pain point for shelters and low-income pet owners is
          a general lack of resources — the sharing economy offers a new,
          creative way to think about locating, accessing, and trading them.
        </p>
      </div>

      <div className="grid gap-8 bg-black/[0.03] px-6 py-12 sm:grid-cols-3 dark:bg-white/[0.03]">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="mx-auto max-w-xs">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              className="h-7 w-7 text-brand-green"
            >
              {benefit.icon}
            </svg>
            <h3 className="mt-3 font-medium">{benefit.title}</h3>
            <p className="mt-2 text-sm text-black/70 dark:text-white/70">
              {benefit.body}
            </p>
          </div>
        ))}
      </div>

      <div className="relative flex min-h-[160px] items-center overflow-hidden">
        <Image
          src="/hero/team-stats-bg.png"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 flex w-full flex-wrap justify-center gap-12 px-6 text-center text-white">
          <div>
            <p className="font-brand text-3xl font-bold">{wishCount}</p>
            <p className="text-sm opacity-80">wishes posted</p>
          </div>
          <div>
            <p className="font-brand text-3xl font-bold">{supplyCount}</p>
            <p className="text-sm opacity-80">supplies offered</p>
          </div>
          <div>
            <p className="font-brand text-3xl font-bold">{userCount}</p>
            <p className="text-sm opacity-80">members</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="font-brand text-3xl font-extrabold">
          THE<span className="text-brand-green">TEAM</span>
        </h2>
        <hr className="my-4 border-black/10 dark:border-white/10" />
        <p className="max-w-2xl text-black/70 dark:text-white/70">
          Dognate started during the winter of 2013–2014 at Coding Dojo in
          Mountain View, California. That winter, a cold front hit the San
          Francisco Bay Area hard, and the Vallejo animal shelter — most of
          its operations outdoors — was short on blankets, bedding, and
          anything else that could keep the dogs warm. That&apos;s what led
          to building this project with three classmates, so we could help
          shelters and organizations like it get what they actually needed.
        </p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {team.map((member) => (
            <div key={member.name}>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-green font-brand text-lg font-semibold text-white">
                  {initials(member.name)}
                </div>
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-black/60 dark:text-white/60">
                    {member.location}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-black/70 dark:text-white/70">
                {member.title}
              </p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm text-brand-green underline"
              >
                LinkedIn
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-black/[0.03] px-6 py-16 dark:bg-white/[0.03]">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-brand text-3xl font-extrabold">
            WE GOT <span className="text-brand-green">SKILLS</span>
          </h2>
          <p className="mt-4 max-w-2xl text-black/70 dark:text-white/70">
            Dognate started as a dog supply exchange platform, originally
            built by pair programming using GitHub, Ruby on Rails, jQuery,
            HTML5, CSS3, and JavaScript. It&apos;s since been rebuilt on
            Next.js and PostgreSQL.
          </p>
          <dl className="mt-8 space-y-3 text-sm text-black/70 dark:text-white/70">
            <div>
              <dt className="inline font-medium text-black dark:text-white">
                David Ortiz:{" "}
              </dt>
              <dd className="inline">
                Integrated jQuery, HTML5, CSS3, Bootstrap, and JavaScript to
                improve the front-end experience, and coordinated the team
                and wireframes.
              </dd>
            </div>
            <div>
              <dt className="inline font-medium text-black dark:text-white">
                Will Russell:{" "}
              </dt>
              <dd className="inline">
                Implemented and coordinated Ruby on Rails, jQuery, HTML5,
                CSS3, and JavaScript on the back end.
              </dd>
            </div>
            <div>
              <dt className="inline font-medium text-black dark:text-white">
                Chung Man Kim:{" "}
              </dt>
              <dd className="inline">
                Implemented and coordinated Ruby on Rails, jQuery, HTML5,
                CSS3, and JavaScript on the back end.
              </dd>
            </div>
            <div>
              <dt className="inline font-medium text-black dark:text-white">
                Nicandro Martinez:{" "}
              </dt>
              <dd className="inline">
                Integrated jQuery, HTML5, CSS3, Bootstrap, and JavaScript to
                improve the front-end experience.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
