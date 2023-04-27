import React, { useState, useEffect } from "react";
import Table from "../components/table/Table";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
// import listproductColorBranch from "../assets/JsonData/productColorBranch.json";

const productColorBranchTableHead = [
  "idPC-Branch",
  "id-Branch",
  "Name Product",
  "Color",
  "Price",
  "Type",
  "amount",
];

const ProductColorBranch = () => {
  const [branchId, setBranchId] = useState(1);
  const [dsFillter, setDsFillter] = useState([]);
  const [listproductColorBranch, setListproductColorBranch] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(0);


  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const history = useHistory();
  const renderBody = (item, index) => (
    <tr key={index} onClick={() => HandleClickProductColorBranch(item.idBPC)}>
      <td>{item.idBPC}</td>
      <td>{item.idBranch}</td>
      <td>{item.nameProduct}</td>
      <td>{item.nameColor}</td>
      <td>{item.price}</td>
      <td>{item.type}</td>
      <td>{item.amount}</td>
    </tr>
  );



  // chuyển side working
  function HandleClickProductColorBranch(idPCB) {
    const idPCBtmp = idPCB ? idPCB : "";
    history.push(`/productColorBranchWorkingPage/${idPCBtmp}`);
    console.log("co click");
  }

  const handleBranchFilter = (event) => {
    const value = event.target.value;
    console.log(event.target.value)
    setBranchId(value)
  };

  useEffect(() => {
    // Gọi API hoặc lấy dữ liệu từ database tại đây
    // Ví dụ:
    fetch('https://localhost:8000/Admin/getBranchProductColor')
      .then(res => res.json())
      .then((data) => {
        setListproductColorBranch(data)
        setIsLoading(false)
      }
      )
      .catch(err => console.error(err));
  }, []); // Lưu ý tham số thứ hai của useEffect, truyền vào một mảng rỗng để useEffect chỉ chạy một lần khi component được mount

  useEffect(() => {
    const filteredList = listproductColorBranch.filter(
      (item) => item.idBranch === parseInt(branchId)
    );
    setDsFillter(filteredList);
    setKey(key + 1)
  }, [branchId, listproductColorBranch]);



  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <div key={key}>
      <h2 className="page-header">Product- Color</h2>

      <select
        id="product-color-branch"
        name="product-color"
        className="select-color"
        value={branchId}
        onChange={handleBranchFilter}
      >
        <option value="1">Cửa Hàng 1</option>
        <option value="2">Cửa Hàng 2</option>
        <option value="3">Cửa Hàng 3</option>
      </select>

      <button
        className="addProduct"
        onClick={() => HandleClickProductColorBranch(null)}
      >
        Thêm
      </button>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <Table
                limit="10"
                headData={productColorBranchTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={dsFillter}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductColorBranch;
