import React, { useState, useEffect } from "react";
import "./css/ProductColorWorkingPage.css";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
function ProductColorWorkingPage() {
  const [productCode, setProductCode] = useState("");
  const [productColor, setProductColor] = useState("Đen");
  const [productPrice, setProductPrice] = useState("");
  const { idPC } = useParams();

  //data là PC gọi lên khi click
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`https://localhost:7242/productcolor/${idPC}`)
      .then((response) => response.json())
      .then((data) => {
        data = data.data;

        setProductCode(data.productId);
        setProductColor(data.nameColorId);
        setProductPrice(data.price);
        setData(data);
      })
      .catch((error) => console.error(error));
  }, []);

  function clearForm() {
    setProductCode("");
    setProductColor("");
    setProductPrice("");
  }

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

    // thêm sản phẩm - color
    if (!idPC) {
      const dataToSend = {
        id: 0,
        price: parseFloat(productPrice),
        productId: parseInt(productCode),
        nameColorId: productColor,
      };

      console.log(dataToSend);
      fetch("https://localhost:7242/productcolor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response:", data);
          if (data.result.data == 1) {
            Swal.fire({
              title: "Thêm Thành Công",
              icon: "success",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                // Thực hiện các thao tác cần thiết sau khi xóa thành công
                clearForm();
              }
            });
          } else {
            Swal.fire({
              title: "Thêm Thất Bại",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OK",
            });
          }
        })
        .catch((error) => console.error(error));
    }

    // cập nhật sửa  sản phẩm-color{"text":"public.\"BranchPromotionProduct\"","objUrl":"/browser/table/obj/1/1/16398/2200/16406","nodeType":"table","cur":{"from":31,"to":31}}
    if (idPC) {
      const dataToSend = {
        Id: idPC,
        Price: parseFloat(productPrice),
        ProductId: parseInt(productCode),
        NameColorId: productColor,
      };

      console.log(dataToSend);
      fetch("https://localhost:7242/productcolor/updateproductcolor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response:", data);
          data = data.result;
          if (data.data == 1) {
            Swal.fire({
              title: "Sửa Thành Công",
              icon: "success",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                // Thực hiện các thao tác cần thiết sau khi xóa thành công
                clearForm();
              }
            });
          } else {
            Swal.fire({
              title: "Thêm Thất Bại",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OK",
            });
          }
        })
        .catch((error) => console.error(error));
    }
  };

  // xử lý xóa sản phẩm
  function handleDelete(idProduct) {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa comment này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://localhost:7242/productcolor/deleteproductcolor/${idPC}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.value == 1) {
              console.log("Product successfully deleted");
              Swal.fire({
                title: "Xóa Thành Công",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  // Thực hiện các thao tác cần thiết sau khi xóa thành công
                  clearForm();
                }
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting product:", error);
          });
      }
    });
  }

  return (
    <div>
      {idPC ? <h1>MÃ Product-Color {idPC}</h1> : null}
      <form
        className="ProductColorWorkingPage-Container"
        onSubmit={handleSubmit}
      >
        <div className="ProductColorWorkingPage-Item">
          <label htmlFor="product-code">Mã sản phẩm:</label>
          <input
            type="text"
            id="product-code"
            name="product-code"
            value={productCode}
            onChange={handleProductCodeChange}
            disabled={idPC ? true : false}
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
            disabled={idPC ? true : false}
          >
            <option value="Đen">Đen</option>
            <option value="Trắng">Trắng</option>
            <option value="Vàng">Vàng</option>
            <option value="Xanh">Xanh</option>
            <option value="Xám">Xám</option>
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
    </div>
  );
}

export default ProductColorWorkingPage;
