export type AiMetrics = {
  lastLatencyMs: number | null;
  generatedRoundCount: number;
  fallbackCount: number;
  errorCount: number;
};

export const emptyAiMetrics: AiMetrics = {
  lastLatencyMs: null,
  generatedRoundCount: 0,
  fallbackCount: 0,
  errorCount: 0,
};

export function AiMetricsPanel({ metrics }: { metrics: AiMetrics }) {
  return (
    <div className="grid gap-2 border border-white/12 bg-black/24 p-3 text-xs sm:grid-cols-4">
      <div>
        <p className="font-black uppercase tracking-[0.14em] text-[#47f7ff]">Last latency</p>
        <p className="mt-1 font-bold text-white">{metrics.lastLatencyMs === null ? "n/a" : `${metrics.lastLatencyMs}ms`}</p>
      </div>
      <div>
        <p className="font-black uppercase tracking-[0.14em] text-[#47f7ff]">Generated</p>
        <p className="mt-1 font-bold text-white">{metrics.generatedRoundCount}</p>
      </div>
      <div>
        <p className="font-black uppercase tracking-[0.14em] text-[#faff00]">Fallbacks</p>
        <p className="mt-1 font-bold text-white">{metrics.fallbackCount}</p>
      </div>
      <div>
        <p className="font-black uppercase tracking-[0.14em] text-[#ff8a3d]">Errors</p>
        <p className="mt-1 font-bold text-white">{metrics.errorCount}</p>
      </div>
    </div>
  );
}

export function mergeAiMetrics(
  current: AiMetrics,
  meta: { latency_ms: number; fallback_used: boolean; error_type?: string },
) {
  return {
    lastLatencyMs: meta.latency_ms,
    generatedRoundCount: current.generatedRoundCount + 1,
    fallbackCount: current.fallbackCount + (meta.fallback_used ? 1 : 0),
    errorCount: current.errorCount + (meta.error_type ? 1 : 0),
  };
}

