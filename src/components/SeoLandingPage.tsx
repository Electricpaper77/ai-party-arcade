import { AnalyticsLink, AnalyticsPageView } from "@/components/AnalyticsHooks";
import { PageHeader } from "@/components/PageHeader";
import type { SeoLandingPage as SeoLandingPageData } from "@/lib/gameData";
import { getSeoGamesForPage, seoLandingPages } from "@/lib/gameData";

const statusLabels = {
  live: "Live",
  demo: "Demo",
  "coming-soon": "Coming soon",
};

const aiModeLabels = {
  "ai-generated": "AI-generated",
  "ai-assisted": "AI-assisted",
  "non-ai": "Non-AI",
  "coming-soon": "Coming soon",
};

export function SeoLandingPage({ page }: { page: SeoLandingPageData }) {
  const relatedGames = getSeoGamesForPage(page.slug);
  const otherPages = seoLandingPages.filter((item) => item.slug !== page.slug);

  return (
    <>
      <AnalyticsPageView event="seo_page_view" payload={{ page: page.slug }} />
      <PageHeader eyebrow="Game guide" title={page.h1} description={page.description}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <AnalyticsLink
            href={page.primaryHref}
            event="seo_game_cta_click"
            payload={{ page: page.slug, href: page.primaryHref }}
            className="rounded bg-[#faff00] px-5 py-3 text-center text-sm font-black uppercase tracking-[0.14em] text-[#111114] shadow-[4px_4px_0_#ff3df2]"
          >
            {page.primaryCta}
          </AnalyticsLink>
          <AnalyticsLink
            href="/games"
            event="seo_game_cta_click"
            payload={{ page: page.slug, href: "/games" }}
            className="rounded border border-white/24 px-5 py-3 text-center text-sm font-black text-white hover:bg-white/10"
          >
            Browse Games
          </AnalyticsLink>
          <AnalyticsLink
            href="/daily"
            event="seo_game_cta_click"
            payload={{ page: page.slug, href: "/daily" }}
            className="rounded border border-white/24 px-5 py-3 text-center text-sm font-black text-white hover:bg-white/10"
          >
            Daily Challenge
          </AnalyticsLink>
        </div>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
          <aside className="space-y-5">
            <div className="border border-white/14 bg-[#11111b]/92 p-5">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#47f7ff]">Audience</p>
              <p className="mt-3 text-sm leading-7 text-white/72">{page.audience}</p>
            </div>
            <div className="border border-[#faff00]/30 bg-[#faff00]/10 p-5">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#fffca8]">Safety note</p>
              <p className="mt-3 text-sm leading-7 text-white/72">{page.safetyNote}</p>
            </div>
            <div className="border border-white/14 bg-[#10101a]/92 p-5">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff3df2]">Keywords</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {page.keywords.map((keyword) => (
                  <span key={keyword} className="rounded border border-white/16 bg-white/[0.04] px-3 py-2 text-xs font-black text-white/72">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#47f7ff]">Related games</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">Launch-ready game chunks</h2>
              </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {relatedGames.map((game) => (
                <article key={game.slug} className="border border-white/14 bg-[#11111b]/86 p-5 shadow-[8px_8px_0_rgba(255,255,255,0.08)]">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <h3 className="text-2xl font-black">{game.title}</h3>
                    <span className="rounded border border-[#faff00]/40 bg-[#faff00]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#faff00]">
                      {statusLabels[game.status]}
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-white/68">{game.seoDescription}</p>
                  <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                    <div className="border border-white/10 bg-white/[0.03] p-3">
                      <dt className="text-xs font-black uppercase tracking-[0.16em] text-[#3cff87]">AI mode</dt>
                      <dd className="mt-1 font-bold text-white">{aiModeLabels[game.aiMode]}</dd>
                    </div>
                    <div className="border border-white/10 bg-white/[0.03] p-3">
                      <dt className="text-xs font-black uppercase tracking-[0.16em] text-[#47f7ff]">Player mode</dt>
                      <dd className="mt-1 font-bold text-white">{game.playerMode}</dd>
                    </div>
                    <div className="border border-white/10 bg-white/[0.03] p-3">
                      <dt className="text-xs font-black uppercase tracking-[0.16em] text-[#ff8a3d]">Replay hook</dt>
                      <dd className="mt-1 font-bold text-white">{game.replayHook}</dd>
                    </div>
                    <div className="border border-white/10 bg-white/[0.03] p-3">
                      <dt className="text-xs font-black uppercase tracking-[0.16em] text-[#faff00]">Safety boundary</dt>
                      <dd className="mt-1 font-bold text-white">{game.safetyBoundary}</dd>
                    </div>
                  </dl>
                  <AnalyticsLink
                    href={game.href}
                    event="related_game_click"
                    payload={{ page: page.slug, game: game.slug }}
                    className="mt-6 inline-flex min-h-11 items-center rounded bg-white px-4 py-3 text-sm font-black text-[#111114] transition hover:bg-[#faff00]"
                  >
                    {game.status === "coming-soon" ? "View status" : "Open game"}
                  </AnalyticsLink>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 border border-white/14 bg-[#10101a]/92 p-5 sm:p-6">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#ff3df2]">Explore more AI game modes</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {otherPages.map((item) => (
              <AnalyticsLink
                key={item.slug}
                href={item.href}
                event="seo_game_cta_click"
                payload={{ page: page.slug, href: item.href }}
                className="border border-white/14 bg-white/[0.03] p-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                {item.title.replace(" | AI Party Arcade", "")}
              </AnalyticsLink>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
