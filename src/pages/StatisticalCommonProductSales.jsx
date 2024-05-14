import React, { Fragment, useEffect, useRef, useState } from "react";
import Chart from "chart.js";
import "./css/StatisticalBranchOfMonth.css";

function StatisticalCommonProductSales() {
  const chartRef = useRef(null);
  const [month, setMonth] = useState("1");
  const [branchId, setBranchId] = useState("1");
  const [selectedYear, setSelectedYear] = useState("");
  /// get data
  const [data, setData] = useState([]);
  const [listNameProduct, setListNameProduct] = useState([]);
  const [amountOfProduct, setAmountOfProduct] = useState([]);

  // Create an array with the last 3 years
  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear - 1, currentYear - 2];


  // Handle select change
  const handleYearSelect = (event) => {
    console.log(event.target.value)
    setSelectedYear(event.target.value);
  };
  // handle  selected month
  const handleMonthSelect = (event) => {
    console.log(event.target.value)
    setMonth(event.target.value);
  };

  //handle select branchid
  const handleBranchSelect = (event) => {
    console.log(event.target.value)
    setBranchId(event.target.value);
  };

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "pie",
      data: {
        labels: listNameProduct,
        datasets: [
          {
            data: amountOfProduct,
            backgroundColor: ["#04c88d", "#ff0000", "#fff800", "gray", "pink"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });


    console.log(listNameProduct, amountOfProduct)
  }, [data]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost:7242/statistical/statisticalTop5/${selectedYear}/${month}/${branchId}`);
        const jsonData = await response.json();


        console.log(jsonData)

        // get  name product
        var tmpName = []
        for (var i = 0; i < jsonData.length; i++) {
          tmpName.push(jsonData[i].nameProduct)
        }
        setListNameProduct(tmpName)

        // get amount of each product 
        var tmpValue = []
        for (var i = 0; i < jsonData.length; i++) {
          tmpValue.push(jsonData[i].totalAmountSale)
        }
        setAmountOfProduct(tmpValue)


        setData(jsonData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [month, selectedYear, branchId]);


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
          {data.map((item) => (
            <div className="box-item-number">
              <h1>{item.nameProduct} : {item.totalAmountSale} SP</h1>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default StatisticalCommonProductSales;
