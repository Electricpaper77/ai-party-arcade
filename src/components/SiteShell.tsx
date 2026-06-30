import Link from "next/link";
import type { ReactNode } from "react";

const navItems = [
  { href: "/games", label: "Games" },
  { href: "/create-room", label: "Create Room" },
  { href: "/leaderboard", label: "Leaderboard" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-hidden bg-[#07070c] text-white">
      <div className="fixed inset-0 -z-10 pixel-grid opacity-70" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(71,247,255,0.22),transparent_34%),radial-gradient(circle_at_85%_12%,rgba(255,61,242,0.20),transparent_32%),linear-gradient(180deg,rgba(7,7,12,0.15),#07070c_72%)]" />
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#07070c]/86 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded bg-[#faff00] font-black text-[#101014] shadow-[4px_4px_0_#ff3df2]">
              AI
            </span>
            <span className="text-sm font-black uppercase tracking-[0.22em] text-white sm:text-base">
              Party Arcade
            </span>
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded px-4 py-2 text-sm font-bold text-white/72 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/create-room"
            className="inline-flex min-h-11 items-center rounded bg-[#47f7ff] px-4 py-3 text-sm font-black text-[#071014] shadow-[4px_4px_0_#ff3df2] transition hover:-translate-y-0.5"
          >
            New Room
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-white/10 px-4 py-8 text-sm text-white/58">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>AI Party Arcade is an MVP demo. Room and leaderboard data are stored only in this browser.</p>
          <nav className="flex flex-wrap gap-4">
            <Link href="/terms" className="inline-flex min-h-11 items-center px-2 hover:text-white">
              Terms
            </Link>
            <Link href="/privacy" className="inline-flex min-h-11 items-center px-2 hover:text-white">
              Privacy
            </Link>
            <Link href="/safety" className="inline-flex min-h-11 items-center px-2 hover:text-white">
              Safety
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
