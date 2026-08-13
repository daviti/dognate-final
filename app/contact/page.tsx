import ContactForm from "@/components/ContactForm";

const info = [
  {
    title: "Location Address",
    lines: ["Dognate", "1971 Woof Woof Blvd.", "San Francisco, CA 94115"],
  },
  {
    title: "Social Media",
    lines: ["facebook.com/dognate.org", "@tweetdognate"],
  },
  {
    title: "Email Address",
    lines: ["info@dognate.com"],
  },
];

export default function ContactPage() {
  return (
    <div>
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="font-brand text-4xl font-extrabold">
          CONTACT<span className="text-brand-green">US</span>
        </h1>
      </div>

      <div className="grid gap-8 bg-black/[0.03] px-6 py-12 sm:grid-cols-3 dark:bg-white/[0.03]">
        {info.map((block) => (
          <div key={block.title}>
            <h3 className="font-medium">{block.title}</h3>
            <div className="mt-2 text-sm text-black/70 dark:text-white/70">
              {block.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-md px-6 py-16">
        <ContactForm />
      </div>
    </div>
  );
}
