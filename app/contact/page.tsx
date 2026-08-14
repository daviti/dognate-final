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
      <div className="mx-auto max-w-3xl px-6 pt-14 pb-10">
        <h1 className="stamped text-4xl">
          Contact <span className="text-stamp-red">us</span>
        </h1>
      </div>

      <div className="grid gap-8 border-y border-black/10 bg-paper-deep px-6 py-12 sm:grid-cols-3">
        {info.map((block) => (
          <div key={block.title}>
            <h3 className="text-xs tracking-widest text-ink-soft uppercase">
              {block.title}
            </h3>
            <div className="mt-2 text-sm">
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
