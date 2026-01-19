"use client";

import { type EChartsOption } from "echarts";
import ReactECharts from "echarts-for-react";

type StatChartProps = {};
let base = +new Date(1988, 9, 3);
let oneDay = 24 * 3600 * 1000;

let data = [[base, Math.random() * 300]];
for (let i = 1; i < 20000; i++) {
  let now = new Date((base += oneDay));
  data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
}

export default function StatChart() {
  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      position: function (pt) {
        return [pt[0], "10%"];
      },
    },
    grid: {
      left: 0,
      right: 0,
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "time",
      boundaryGap: [0, "100%"],
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "100%"],
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 20,
      },
      {
        start: 0,
        end: 20,
      },
    ],
    series: [
      {
        name: "Downloads",
        type: "line",
        smooth: true,
        symbol: "none",
        data: data,
      },
    ],
  };

  return <ReactECharts option={option} />;
}
