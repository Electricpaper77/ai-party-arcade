import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SiteShell } from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy notes for the AI Party Arcade MVP demo.",
  alternates: {
    canonical: "/privacy",
  },
};

const privacyNotes = [
  "AI Party Arcade does not require login, payment, or an account in this MVP.",
  "Room setup, daily streaks, story lines, demo scores, and leaderboard entries are stored in your browser localStorage.",
  "LocalStorage data is not a secure vault. Do not enter sensitive personal data, confidential information, passwords, or financial details.",
  "AI generation is requested through server-side API routes when AI_API_KEY is configured. The browser never receives the API key.",
  "The MVP includes analytics-ready browser events, but does not send analytics to a third-party service, add Supabase, ads, login, payments, or synchronized multiplayer storage.",
  "Clearing your browser data or using the reset leaderboard button can remove local demo scores.",
  "If backend services are added later, this privacy page should be updated before public launch.",
];

export default function PrivacyPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="Privacy"
        title="Local demo data stays in your browser."
        description="The current MVP is designed to be easy to review without accounts, tracking, payments, or backend storage."
      />
      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="space-y-4 border border-white/14 bg-[#11111b]/92 p-5 sm:p-6">
          {privacyNotes.map((item) => (
            <p key={item} className="text-sm leading-7 text-white/72">
              {item}
            </p>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
