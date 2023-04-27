import React from "react";
import "./css/Statistical.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
function StatisticalPage() {
  const history = useHistory();

  function handleClickStatisticalMonthOfBranch() {
    history.push(`/statisticalMonthOfBranch`);
    console.log("co click");
  }

  function handleClickStatisticalCommonProductSales() {
    history.push(`/statisticalCommonProductSales`);
    console.log("co click");
  }

  return (
    <div className="statistical-container">
      <div
        className="statistical-item"
        onClick={handleClickStatisticalMonthOfBranch}
      >
        <h1>
          <i class="fa-solid fa-chart-pie icon-pieChart"></i>
          Thống Kê Doanh Thu <br></br> Từng Cửa Hàng Theo Tháng
        </h1>
      </div>

      <div
        className="statistical-item"
        onClick={handleClickStatisticalCommonProductSales}
      >
        <h1>
          <i class="fa-solid fa-chart-pie icon-pieChart"></i>
          Thống Kê 20<br></br> Sản phẩm bán chạy nhất<br></br> Trong Tháng
        </h1>
      </div>
    </div>
  );
}

export default StatisticalPage;
