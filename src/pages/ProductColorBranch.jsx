import React, { useState, useEffect } from "react";
import Table from "../components/table/Table";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import listproductColorBranch from "../assets/JsonData/productColorBranch.json";

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
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const history = useHistory();
  const renderBody = (item, index) => (
    <tr key={index} onClick={() => HandleClickProductColorBranch(item.id_bpc)}>
      <td>{item.id_bpc}</td>
      <td>{item.idBranch_id}</td>
      <td>{item.Name}</td>
      <td>{item.nameColor_id}</td>
      <td>{item.Price}</td>
      <td>{item.Type}</td>
      <td>{item.Amount}</td>
    </tr>
  );
  const [branchId, setBranchId] = useState(1);
  const [dsFillter, setDsFillter] = useState([]);
  const [key, setKey] = useState(1);
  const [selectValue, setSelectValue] = useState("1");

  function HandleClickProductColorBranch(idPCB) {
    history.push(`/productColorBranchWorkingPage/${idPCB}`);
    console.log("co click");
  }

  const handleBranchFilter = (event) => {
    const value = event.target.value;
    setSelectValue(value);
  };

  useEffect(() => {
    setBranchId(parseInt(selectValue));
    setKey(key + 1);
    const newDsFillter = listproductColorBranch.filter((h) => {
      if (h.idBranch_id === branchId) return true;
      else return false;
    });

    setDsFillter(newDsFillter);
  }, [selectValue, branchId]);

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
