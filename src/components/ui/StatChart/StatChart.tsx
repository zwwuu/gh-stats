"use client";

import { type EChartsOption } from "echarts";
import ReactECharts from "echarts-for-react";

import { getReleases } from "@/lib/github";
import { prettyDate, prettyNumber } from "@/lib/pretty-format";

type StatChartProps = {
  releases: Awaited<ReturnType<typeof getReleases>>;
};

export default function StatChart({ releases }: StatChartProps) {
  const sortedReleases = [...releases]
    .filter((r) => r.published_at)
    .sort((a, b) => new Date(a.published_at!).getTime() - new Date(b.published_at!).getTime());

  const startValue =
    sortedReleases.length > 10 ? (sortedReleases[sortedReleases.length - 10].published_at as string) : undefined;

  const maxRelease = sortedReleases.reduce(
    (max, r) => (r.total_download_count > max.total_download_count ? r : max),
    sortedReleases[0],
  );
  const minRelease = sortedReleases.reduce(
    (min, r) => (r.total_download_count < min.total_download_count ? r : min),
    sortedReleases[0],
  );

  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      formatter: (params) => {
        const param = Array.isArray(params) ? params[0] : params;
        const data = param.data as StatChartProps["releases"][0];
        return `
          <div style="font-weight: bold; margin-bottom: 4px;">Tag: ${data.tag_name} ${data.draft ? "Draft" : ""}${data.prerelease ? " (Pre-release)" : ""}</div>
          <div >${data.published_at ? `Published At: ${prettyDate(data.published_at)}` : ""}</div>
          <div >Downloads: ${prettyNumber(data.total_download_count, false)}</div>
        `;
      },
    },
    grid: {
      left: "0",
      right: "0",
    },
    toolbox: {
      feature: {
        dataZoom: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    xAxis: {
      type: "category",
      axisLabel: {
        formatter: (value: string) => prettyDate(value),
      },
      axisPointer: {
        type: "shadow",
      },
    },
    yAxis: {
      type: "value",
    },
    dataZoom: [
      {
        type: "inside",
        startValue: startValue,
      },
      {
        startValue: startValue,
      },
    ],
    dataset: {
      dimensions: ["id", "published_at", "tag_name", "draft", "prerelease", "total_download_count"],
      source: sortedReleases,
    },
    series: [
      {
        name: "Downloads",
        type: "bar",
        encode: {
          x: "published_at",
          y: "total_download_count",
          itemId: "id",
          tooltip: ["tag_name", "published_at", "total_download_count", "draft", "prerelease"],
        },
        itemStyle: {
          color: (params) => {
            const data = params.data as StatChartProps["releases"][0];
            if (data.id === maxRelease.id) return "#ef4444";
            if (data.id === minRelease.id) return "#3b82f6";
            return "#94a3b8";
          },
        },
      },
    ],
  };

  return <ReactECharts option={option} />;
}
