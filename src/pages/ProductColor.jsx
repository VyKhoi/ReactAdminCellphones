import React, { useState, useEffect } from "react";
import Table from "../components/table/Table";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
// import productColorList from "../assets/JsonData/productColor.json";

const productColorTableHead = [
  "idProduct-Color",
  "Name Product",
  "Color",
  "Price",
  "Type",
];
const ProductColor = () => {
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const history = useHistory();
  const renderBody = (item, index) => (
    <tr key={index} onClick={() => HandleClickProductColor(item.IdPC)}>
      <td>{item.IdPC}</td>
      <td>{item.nameProduct}</td>
      <td>{item.nameColor}</td>
      <td>{item.price}</td>
      <td>{item.type}</td>
    </tr>
  );

  function HandleClickProductColor(idPC) {
    history.push(`/productColorsWorkingPage/${idPC}`);
    console.log("co click");
  }



  // get data


  const [productColorList, setProductColorList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Gọi API hoặc lấy dữ liệu từ database tại đây
    // Ví dụ:
    fetch('https://localhost:8000/Admin/getProductColor')
      .then(res => res.json())
      .then((data) => {
        setProductColorList(data)
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
      <h2 className="page-header">Product- Color</h2>

      <button
        className="addProduct"
        onClick={() => HandleClickProductColor("")}
      >
        Thêm
      </button>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={productColorTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={productColorList}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductColor;
