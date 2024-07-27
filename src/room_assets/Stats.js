import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

export default function Stats() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["Pdf", "Img", "Docs"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--green-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--green-400"),
          ],
        },
      ],
    };
    const options = {
      cutout: "60%",
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="grid" style={{ padding: "30px" }}>
      <div className="lg:col-6 md:col-12">
        <div style={{ width: "40%" }}>
          <Chart
            type="doughnut"
            data={chartData}
            options={chartOptions}
            width="20rem"
          />
        </div>
      </div>
      <div
        className="lg:col-6 md:col-12"
        style={{ border: "2px solid black" }}
      ></div>
    </div>
  );
}
