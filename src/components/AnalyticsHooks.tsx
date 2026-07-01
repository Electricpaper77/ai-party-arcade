"use client";

import Link from "next/link";
import { useEffect, type ReactNode } from "react";
import { trackAnalyticsEvent, type AnalyticsEventName, type AnalyticsEventPayload } from "@/lib/analytics";

export function AnalyticsPageView({ event, payload = {} }: { event: AnalyticsEventName; payload?: AnalyticsEventPayload }) {
  useEffect(() => {
    trackAnalyticsEvent(event, payload);
  }, [event, payload]);

  return null;
}

export function AnalyticsLink({
  href,
  event,
  payload = {},
  className,
  children,
}: {
  href: string;
  event: AnalyticsEventName;
  payload?: AnalyticsEventPayload;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={className} onClick={() => trackAnalyticsEvent(event, payload)}>
      {children}
    </Link>
  );
}
