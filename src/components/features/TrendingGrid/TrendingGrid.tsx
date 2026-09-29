"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import RepoGridSkeleton from "../RepoGrid/RepoGridSkeleton";

const TrendingGridClient = dynamic(() => import("./TrendingGridClient"), {
  ssr: false,
  loading: () => <RepoGridSkeleton />,
});

export default function TrendingGrid() {
  return (
    <Suspense fallback={<RepoGridSkeleton />}>
      <TrendingGridClient />
    </Suspense>
  );
}
