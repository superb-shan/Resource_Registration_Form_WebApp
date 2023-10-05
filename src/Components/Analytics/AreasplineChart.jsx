import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function AreaSplineChart({ data }) {
  // Define an array of month names
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Extract data  for the chart series
  const seriesData = data.map((graphData) => ({
    name: graphData.name,
    data: graphData.data.map((point) => [point.month - 1, point.value]), // Subtract 1 to match monthNames array
  }));

  const [options, setOptions] = useState({
    chart: {
      type: "spline",
      backgroundColor: "transparent",
      height: "400px",
    },
    title: {
      text: "",
    },
    exporting: {
      enabled: false,
    },
    legend: {
      enabled: true,
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5,
      },
    },
    xAxis: {
      title: {
        text: "Month",
      },
      categories: data[0].data.map((point) => monthNames[point.month - 1]), // Subtract 1 to match monthNames array
    },
    yAxis: {
      title: {
        text: "Value",
      },
    },
    tooltip: {
      shared: true,
      valueSuffix: "",
    },
    series: seriesData,
    credits: {
      enabled: false,
    },
  });

  useEffect(() => {
    // Update the chart options when the data changes
    setOptions((previousOptions) => ({
      ...previousOptions,
      xAxis: {
        categories: data[0].data.map((point) => monthNames[point.month - 1]), // Subtract 1 to match monthNames array
      },
    }));
  }, [data]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default AreaSplineChart;
