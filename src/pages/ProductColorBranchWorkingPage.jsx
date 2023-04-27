import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./css/PCB.css";
import Swal from "sweetalert2";

function ProductColorBranchWorkingPage() {
  const [idProductColor, setIdProductColor] = useState("");
  const [productColor, setProductColor] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  // Hàm xử lý submit form
  function handleSubmit(e) {
    e.preventDefault();

    // Code xử lý khi submit form
    // console.log(idProductColor, productColor, productQuantity);
  }

  // Hàm xử lý xóa sản phẩm
  function handleDelete(idProduct) {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa sản phẩm này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
    }).then((result) => {
      if (result.isConfirmed) {
        // Code xử lý khi xóa sản phẩm
        console.log("Đã xóa sản phẩm");
      }
    });
  }

  return (
    <div className="pcb-container">
      <form onSubmit={handleSubmit}>
        <div className="pcb-item">
          <select
            id="product-color"
            name="product-color"
            className="select-color"
            value={productColor}
            onChange={(e) => setProductColor(e.target.value)}
          >
            <option value="1">Cửa Hàng 1</option>
            <option value="2">Cửa Hàng 2</option>
            <option value="3">Cửa Hàng 3</option>
          </select>
        </div>

        <div className="pcb-item">
          <label htmlFor="product-name">Mã sản phẩm - màu sắc: </label>
          <input
            type="text"
            id="product-name"
            value={idProductColor}
            onChange={(e) => setIdProductColor(e.target.value)}
          />
        </div>

        <div className="pcb-item">
          <label htmlFor="product-name">Tên sản phẩm: </label>
        </div>
        <div className="pcb-item">
          <label htmlFor="product-color">Màu sắc: </label>
        </div>

        <div className="pcb-item">
          <label htmlFor="product-price">Giá: </label>
        </div>
        <div className="pcb-item">
          <label htmlFor="product-quantity">Số lượng: </label>
          <input
            type="number"
            id="product-quantity"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
          />
        </div>
        <button className="submit_button" type="submit">
          OK
        </button>
        <button
          className="submit_button delete_button"
          type="button"
          onClick={handleDelete}
        >
          Xóa
        </button>
      </form>
    </div>
  );
}

export default ProductColorBranchWorkingPage;
