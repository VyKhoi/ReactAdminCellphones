import React from "react";

import Table from "../components/table/Table";

import customerList from "../assets/JsonData/customers-list.json";

const customerTableHead = ["Name", "Email", "Phone Number", "Hometown"];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index} onClick={handleClickProduct}>
    <td>{item.Name}</td>
    <td>{item.Email}</td>
    <td>{item.phoneNumber}</td>
    <td>{item.Hometown}</td>
  </tr>
);

function handleClickProduct(idProduct) {
  //   const navigate = useNavigate();
  //   navigate("/new-page");
  console.log(idProduct);
}
const Customers = () => {
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
