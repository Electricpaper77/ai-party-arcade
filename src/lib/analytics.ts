export type AnalyticsEventName =
  | "create_room_click"
  | "copy_invite_link"
  | "prompt_generated"
  | "trivia_generated"
  | "story_continued"
  | "leaderboard_view"
  | "fallback_used"
  | "daily_challenge_view"
  | "daily_challenge_started"
  | "daily_challenge_completed"
  | "share_score_clicked"
  | "streak_updated";

export type AnalyticsEventPayload = Record<string, string | number | boolean | undefined>;

export function trackAnalyticsEvent(name: AnalyticsEventName, payload: AnalyticsEventPayload = {}) {
  if (typeof window === "undefined") {
    return;
  }

  // Analytics-ready hook: connect this CustomEvent to Vercel Analytics, PostHog, Plausible, or another adapter later.
  window.dispatchEvent(
    new CustomEvent("ai-party-arcade:analytics", {
      detail: {
        name,
        payload,
        timestamp: new Date().toISOString(),
      },
    }),
  );
}
