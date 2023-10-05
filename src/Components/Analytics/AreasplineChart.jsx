import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function AreaSplineChart({ data }) {
  // Extract data for the chart series
  const seriesData = data.map((graphData) => ({
    name: graphData.name, // You can set a name for each series here
    data: graphData.data.map((point) => [point.month, point.value]),
  }));

  const [options, setOptions] = useState({
    chart: {
      type: "areaspline",
      backgroundColor: "transparent", // Background color of the chart
      height: "220px",
    },
    title: {
      text: "", // Set your chart title here
    },
    exporting: {
      enabled: false,
    },
    legend: {
      enabled: true, // You can customize legend options here
    },
    plotOptions: {
      areaspline: {
        fillOpacity: 0.5, // Adjust the fill opacity as needed
      },
    },
    xAxis: {
      title: {
        text: "Month", // X-axis title
      },
      categories: data[0].data.map((point) => point.month), // Assuming all series have the same x-axis categories
    },
    yAxis: {
      title: {
        text: "Value", // Y-axis title
      },
    },
    tooltip: {
      shared: true,
      valueSuffix: "", // Add a suffix if needed
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
      series: seriesData,
      xAxis: {
        categories: data[0].data.map((point) => point.month),
      },
    }));
  }, [data]);

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default AreaSplineChart;
