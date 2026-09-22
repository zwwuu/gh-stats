"use client";

import dynamic from "next/dynamic";
import RepoGridSkeleton from "../RepoGrid/RepoGridSkeleton";

const TrendingGrid = dynamic(() => import("./TrendingGridClient"), {
  ssr: false,
  loading: () => <RepoGridSkeleton />,
});

export default TrendingGrid;
