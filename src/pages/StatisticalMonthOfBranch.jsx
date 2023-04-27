import React, { Fragment, useEffect, useRef, useState } from "react";
import Chart from "chart.js";
import "./css/StatisticalBranchOfMonth.css";

function StatisticalMonthOfBranch() {
  const chartRef = useRef(null);
  const [month, setMonth] = useState("1");
  const [selectedYear, setSelectedYear] = useState("");
  // data 
  const [data, setData] = useState([]);
  const [nameBranch, setNameBranch] = useState([]);
  const [valueStatistical, setValueStatistical] = useState([]);



  // Handle select change
  const handleYearSelect = (event) => {
    setSelectedYear(event.target.value);
  };
  // Create an array with the last 3 years
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2];


  const handleMonthSelect = (event) => {
    setMonth(event.target.value);
  };

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "pie",
      data: {
        labels: nameBranch,
        datasets: [
          {
            data: valueStatistical,
            backgroundColor: ["#04c88d", "#ff0000", "#fff800"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });



    console.log("davo bieu do ", nameBranch, valueStatistical)
  }, [data]); // thay đổi data khi goi song


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost:8000/Admin/statisticalBranchsOfMonth/${selectedYear}/${month}`);
        const jsonData = await response.json();


        console.log(jsonData)

        // lấy tên cửa hàng
        var tmpName = []
        for (var i = 0; i < jsonData.length; i++) {
          tmpName.push(jsonData[i].nameBranch)
        }
        setNameBranch(tmpName)

        // lấy thông số thống kê
        var tmpValue = []
        for (var i = 0; i < jsonData.length; i++) {
          tmpValue.push(jsonData[i].statistical)
        }
        setValueStatistical(tmpValue)
        setData(jsonData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [month, selectedYear]);


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
        <option value="4">Tháng 4</option>
        <option value="5">Tháng 5</option>
        <option value="6">Tháng 6</option>
        <option value="7">Tháng 7</option>
        <option value="8">Tháng 8</option>
        <option value="9">Tháng 9</option>
        <option value="10">Tháng 10</option>
        <option value="11">Tháng 11</option>
        <option value="12">Tháng 12</option>
      </select>

      <select
        id="year"
        name="year"
        className="select-year selectType"
        value={selectedYear}
        onChange={handleYearSelect}
      >
        <option value="">-- Chọn năm --</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <div className="pieChart-container">
        <div className="pieChart-container-chart">
          {/* <div className="pieChart-container"> */}
          <canvas id="myChart" ref={chartRef} width={10} height={10} />
          {/* </div> */}
        </div>

        <div className="box-item-container">

          {data.map((item) => (
            <div className="box-item-number">
              <h1>{item.nameBranch} Doanh Thu :{item.statistical} </h1>
            </div>
          ))}


        </div>
      </div>
    </div>
  );
}

export default StatisticalMonthOfBranch;
