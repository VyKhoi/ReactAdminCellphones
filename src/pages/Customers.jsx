import React, { useState, useEffect } from "react";

import Table from "../components/table/Table";

// import customerList from "../assets/JsonData/customers-list.json";

const customerTableHead = ["Name", "Email", "Phone Number", "Hometown"];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index} onClick={handleClickProduct}>
    <td>{item.name}</td>
    <td>{item.email}</td>
    <td>{item.phoneNumber}</td>
    <td>{item.hometown}</td>
  </tr>
);

function handleClickProduct(idProduct) {
  //   const navigate = useNavigate();
  //   navigate("/new-page");
  console.log(idProduct);
}
const Customers = () => {

  const [customerList, setCustomerList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const requestBody = {
    PageSize: 100,
    PageIndex: 1,
  };
  
  useEffect(() => {
    // Gọi API hoặc lấy dữ liệu từ database tại đây
    // Ví dụ:
    fetch('https://localhost:7242/customer/search/name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(res => res.json())
      .then((data) => {
        setCustomerList(data.data)
        setIsLoading(false)
      }
      )
      .catch(err => console.error(err));
  }, []); // Lưu ý tham số thứ hai của useEffect, truyền vào một mảng rỗng để useEffect chỉ chạy một lần khi component được mount


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="page-header">customers</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={customerTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={customerList}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
