import React, { Fragment, useEffect, useRef, useState } from "react";
import Chart from "chart.js";
import "./css/StatisticalBranchOfMonth.css";

function StatisticalCommonProductSales() {
  const chartRef = useRef(null);
  const [month, setMonth] = useState("1");
  const [branchId, setBranchId] = useState("1");
  const handleMonthSelect = (event) => {
    setMonth(event.target.value);
  };
  const handleBranchSelect = (event) => {
    setBranchId(event.target.value);
  };

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "pie",
      data: {
        labels: [
          "Iphone 3",
          "Samsung j7",
          "Redmi Note9s",
          "iphone 4",
          "Samsung A04",
        ],
        datasets: [
          {
            data: [20, 10, 3, 12, 9],
            backgroundColor: ["#04c88d", "#ff0000", "#fff800", "gray", "pink"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Doanh Thu Trong Tháng của các cửa hàng
      </h1>
      <select
        id="month"
        name="month"
        className="select-month selectType"
        value={month}
        onChange={handleMonthSelect}
      >
        <option value="1">Tháng 1</option>
        <option value="2">Tháng 2</option>
        <option value="3">Tháng 3</option>
      </select>

      <select
        id="month"
        name="month"
        className="select-month selectType"
        value={branchId}
        onChange={handleBranchSelect}
      >
        <option value="1">Cửa Hàng 1</option>
        <option value="2">Cửa Hàng 2</option>
        <option value="3">Cửa Hàng 3</option>
      </select>

      <div className="pieChart-container">
        <div className="pieChart-container-chart">
          {/* <div className="pieChart-container"> */}
          <canvas id="myChart" ref={chartRef} width={10} height={10} />
          {/* </div> */}
        </div>

        <div className="box-item-container">
          <div className="box-item-number">
            <h1>Sp 1 </h1>
          </div>
          <div className="box-item-number">
            <h1>Sp 1 </h1>
          </div>
          <div className="box-item-number">
            <h1>Sp 1 </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticalCommonProductSales;
