import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Terms",
  description: "Simple terms for the AI Party Arcade MVP demo.",
  alternates: {
    canonical: "/terms",
  },
};

const terms = [
  "AI Party Arcade is an MVP demo for browser-based party game concepts. Gameplay is local/demo-only until realtime multiplayer is added.",
  "Do not use the site for real-money gambling, wagers, betting, payments, or prize contests.",
  "The experience is not focused on adult content. Keep prompts, stories, names, and room activity suitable for general audiences.",
  "AI-style prompts, trivia, and scoring placeholders may be inaccurate, incomplete, or purely illustrative.",
  "Do not submit sensitive personal data, confidential information, passwords, financial details, or private messages.",
  "Use the demo responsibly and stop using it if it is not appropriate for your group or setting.",
];

export default function TermsPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Terms"
        title="Simple terms for a public MVP."
        description="These terms are intentionally plain because the current product is a local browser demo without accounts, payments, ads, or real multiplayer."
      />
      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="space-y-4 border border-white/14 bg-[#11111b]/92 p-5 sm:p-6">
          {terms.map((item) => (
            <p key={item} className="text-sm leading-7 text-white/72">
              {item}
            </p>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}

