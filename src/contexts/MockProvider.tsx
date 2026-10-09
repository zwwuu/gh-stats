"use client";

import { type ReactNode, useLayoutEffect, useState } from "react";

const mockEnabled = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export function MockProvider({ children }: { children: ReactNode }) {
  const [workerReady, setWorkerReady] = useState(!mockEnabled);

  useLayoutEffect(() => {
    if (!mockEnabled) {
      return;
    }

    let cancelled = false;

    import("../lib/mock-handlers")
      .then(({ worker }) => worker.start({ onUnhandledFrame: "bypass" }))
      .then(() => {
        if (!cancelled) {
          setWorkerReady(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setWorkerReady(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!workerReady) {
    return null;
  }

  return <>{children}</>;
}
