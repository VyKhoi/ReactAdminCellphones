import React from "react";
import Table from "../components/table/Table";
import productList from "../assets/JsonData/productJson.json";
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
    <tr key={index} onClick={() => handleClickProduct(item.Id)}>
      <td>{item.Id}</td>
      <td>{item.Name}</td>
      <td>{item.nameManufacture_id}</td>
      <td>{item.Type}</td>
    </tr>
  );

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
