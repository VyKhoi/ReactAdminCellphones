import React from "react";
import Table from "../components/table/Table";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import productColorList from "../assets/JsonData/productColor.json";
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
    <tr key={index} onClick={() => HandleClickProductColor(item.Id)}>
      <td>{item.Id}</td>
      <td>{item.Name}</td>
      <td>{item.nameColor_id}</td>
      <td>{item.Price}</td>
      <td>{item.Type}</td>
    </tr>
  );

  function HandleClickProductColor(idPC) {
    history.push(`/productColorsWorkingPage/${idPC}`);
    console.log("co click");
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
