import React, { useState } from "react";
import "./css/ProductColorWorkingPage.css";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
function ProductColorWorkingPage() {
  const [productCode, setProductCode] = useState("");
  const [productColor, setProductColor] = useState("den");
  const [productPrice, setProductPrice] = useState("");
  const { idPC } = useParams();
  const handleProductCodeChange = (event) => {
    setProductCode(event.target.value);
  };

  const handleProductColorChange = (event) => {
    setProductColor(event.target.value);
  };

  const handleProductPriceChange = (event) => {
    setProductPrice(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Product Code: ${productCode}`);
    console.log(`Product Color: ${productColor}`);
    console.log(`Product Price: ${productPrice}`);
  };
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
    <form className="ProductColorWorkingPage-Container" onSubmit={handleSubmit}>
      <div className="ProductColorWorkingPage-Item">
        <label htmlFor="product-code">Mã sản phẩm:</label>
        <input
          type="text"
          id="product-code"
          name="product-code"
          value={productCode}
          onChange={handleProductCodeChange}
        />
      </div>

      <div className="ProductColorWorkingPage-Item ">
        <label htmlFor="product-color">Màu sản phẩm:</label>
        <select
          id="product-color"
          name="product-color"
          className="select-color"
          value={productColor}
          onChange={handleProductColorChange}
        >
          <option value="den">Đen</option>
          <option value="trang">Trắng</option>
          <option value="vang">Vàng</option>
          <option value="xanh">Xanh</option>
        </select>
      </div>

      <div className="ProductColorWorkingPage-Item">
        <label htmlFor="product-price">Giá sản phẩm:</label>
        <input
          type="number"
          id="product-price"
          name="product-price"
          value={productPrice}
          onChange={handleProductPriceChange}
        />
      </div>

      <button className="submit_button" type="submit">
        Submit
      </button>
      <button
        className="submit_button delete_button"
        type="button"
        onClick={() => handleDelete(idPC)}
      >
        Xóa
      </button>
    </form>
  );
}

export default ProductColorWorkingPage;
