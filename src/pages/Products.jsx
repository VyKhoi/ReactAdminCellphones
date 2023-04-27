import React, { useState, useEffect } from "react";
import Table from "../components/table/Table";
// import productList from "../assets/JsonData/productJson.json";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./css/Products.css";


const productHeader = ["Id", "Name", "Name Manufacture", "Type"];
const Products = () => {
  const history = useHistory();

  function handleClickProduct(idProduct) {
    const productId = idProduct ? idProduct : "";
    history.push(`/productsWorkingPage/${productId}`);
    console.log("co click");
  }

  const renderHead = (item, index) => <th key={index}>{item}</th>;


  const renderBody = (item, index) => (
    <tr key={index} onClick={() => handleClickProduct(item.id)}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.nameManufactureId}</td>
      <td>{item.type}</td>
    </tr>
  );



  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Gọi API hoặc lấy dữ liệu từ database tại đây
    // Ví dụ:
    fetch('https://localhost:8000/Admin/getProduct')
      .then(res => res.json())
      .then((data) => {
        setProductList(data)
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
      <h1 style={{ textAlign: "center", margin: "auto" }}>Product</h1>

      <button className="addProduct" onClick={() => handleClickProduct(null)}>
        Thêm
      </button>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={productHeader}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={productList}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
