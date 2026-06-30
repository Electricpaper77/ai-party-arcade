import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-party-arcade.vercel.app"),
  title: {
    default: "AI Party Arcade | Free AI-Powered Browser Party Games",
    template: "%s | AI Party Arcade",
  },
  description:
    "Create a room, invite friends, and play AI-powered party games like Prompt Battle, AI Trivia Duel, and Story Chain directly in your browser.",
  applicationName: "AI Party Arcade",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AI Party Arcade | Free AI-Powered Browser Party Games",
    description:
      "Create a room, invite friends, and play AI-powered party games like Prompt Battle, AI Trivia Duel, and Story Chain directly in your browser.",
    url: "/",
    siteName: "AI Party Arcade",
    images: [
      {
        url: "/arcade-hero.png",
        width: 1536,
        height: 1024,
        alt: "Neon arcade room showing AI party game screens",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Party Arcade | Free AI-Powered Browser Party Games",
    description:
      "Create a room, invite friends, and play AI-powered party games like Prompt Battle, AI Trivia Duel, and Story Chain directly in your browser.",
    images: ["/arcade-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#07070c] text-white">{children}</body>
    </html>
  );
}
