import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Safety",
  description: "Safety guidance for using AI Party Arcade MVP demos.",
  alternates: {
    canonical: "/safety",
  },
};

const safetyNotes = [
  "AI Party Arcade is for lightweight party game demos and does not support real-money gambling, wagers, or financial rewards.",
  "The app is not designed around adult content. Keep shared prompts and story lines appropriate for your audience.",
  "AI-style content and sample trivia can be wrong. Do not rely on the demo for education, legal, medical, financial, or safety-critical decisions.",
  "Do not submit sensitive personal data or private information into room names, prompt responses, story lines, or leaderboard names.",
  "Because multiplayer is local/demo-only today, invite links are for review flow and route sharing rather than synchronized live gameplay.",
  "If a prompt or game format feels uncomfortable, stop the round and choose a different activity.",
];

export default function SafetyPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Safety"
        title="Keep games light, clear, and appropriate."
        description="This page sets expectations for a public MVP before realtime multiplayer or live model-generated content is added."
      />
      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="space-y-4 border border-white/14 bg-[#11111b]/92 p-5 sm:p-6">
          {safetyNotes.map((item) => (
            <p key={item} className="text-sm leading-7 text-white/72">
              {item}
            </p>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
