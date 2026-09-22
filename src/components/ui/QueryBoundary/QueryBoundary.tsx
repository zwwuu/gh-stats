"use client";

import type { ReactNode } from "react";
import { Suspense } from "react";

type QueryBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

export default function QueryBoundary({
  children,
  fallback,
}: QueryBoundaryProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}
