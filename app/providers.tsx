'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from '@posthog/react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
    if (!token || !host) return;

    posthog.init(token, {
      api_host: host,
      defaults: '2026-01-30',
      capture_exceptions: {
        capture_unhandled_errors: true, // default
        capture_unhandled_rejections: true, // default
        capture_console_errors: false, // default
      },
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
