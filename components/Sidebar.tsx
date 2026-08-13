import Link from "next/link";

const links = [
  {
    href: "/",
    label: "Home",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"
      />
    ),
  },
  {
    href: "/why-donate",
    label: "Why donate",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8h.01M11 11h1v5h1" />
      </>
    ),
  },
  {
    href: "/board",
    label: "Board",
    icon: (
      <>
        <circle cx="10" cy="10" r="6" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 20l-4.5-4.5" />
      </>
    ),
  },
  {
    href: "/team",
    label: "Team",
    icon: (
      <>
        <circle cx="9" cy="8" r="3" strokeLinecap="round" strokeLinejoin="round" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 8a3 3 0 1 1 0 6M22 20c0-2.6-1.8-4.8-4.2-5.6"
        />
      </>
    ),
  },
  {
    href: "/contact",
    label: "Contact",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m4 6 8 6 8-6" />
      </>
    ),
  },
];

export default function Sidebar() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-y-0 left-0 z-20 flex w-16 flex-col items-center gap-1 bg-brand-brown py-4"
    >
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          title={link.label}
          className="flex h-11 w-11 items-center justify-center rounded text-white/80 hover:bg-white/10 hover:text-white"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            className="h-5 w-5"
          >
            {link.icon}
          </svg>
        </Link>
      ))}
    </nav>
  );
}
