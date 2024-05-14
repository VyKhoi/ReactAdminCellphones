import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./css/PCB.css";
import Swal from "sweetalert2";

function ProductColorBranchWorkingPage() {

  const [idProductColor, setIdProductColor] = useState("");
  const [idBranch, setIdBranch] = useState(1);
  const [productQuantity, setProductQuantity] = useState("");
  const { idbpc } = useParams();
  const [key, setKey] = useState(0);

  // get BPC
  const [data, setData] = useState([]);
  useEffect(() => {
    if (idbpc) {
      fetch(`https://localhost:7242/branchproductcolor/getinforofaproductcolorinbranch/${idbpc}`)
        .then(response => response.json())
        .then(data => {

          setIdProductColor(data.idPC)
          setIdBranch(data.idBranch)
          setData(data)
        })
        .catch(error => console.error(error));
    }
  }, []);

  useEffect(() => {
    fetch(`https://localhost:7242/branchproductcolor/getproductcolor-product/${idProductColor}`)
      .then(response => response.json())
      .then(data => {
        data = data.data;
        // setIdBranch(data.idBranch)
        setData(data)
      })
      .catch(error => console.error(error));
  }, [idProductColor]);



  // Hàm xử lý submit form
  function handleSubmit(e) {
    e.preventDefault();

    if (idProductColor == "") {
      console.log("gia trin idProductColor la ", idProductColor)
      Swal.fire({
        title: "Thêm Thất Bại",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK",
      })
      return;
    }


    if (!idbpc) // thêm sp
    {
      const dataToSend = {
        idBPPC: 0,
        idPC: idProductColor,
        idBranch: idBranch,
        amount: productQuantity
      };

      console.log(dataToSend)
      fetch('https://localhost:7242/branchproductcolor/addInforOfAProductColorInBranch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Response:', data);
          if (data.value == 1) {
            Swal.fire({
              title: "Thêm Thành Công",
              icon: "success",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OK",
            }).then((result) => {
              if (result.isConfirmed) {
                // Thực hiện các thao tác cần thiết thêm khi xóa thành công
                clearForm();
              }
            })
          } else {
            Swal.fire({
              title: "Thêm Thất Bại",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "OK",
            })
          }
        })
        .catch(error => console.error(error));
    }

    // cập nhật branch-product-color


  }


  const clearForm = () => {
    setIdProductColor("");
    setIdBranch("");
    setProductQuantity("");
    setKey(key + 1)
  };

  // Hàm xử lý xóa sản phẩm
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

        fetch(`https://localhost:7242/branchproductcolor/deleteInforOfAProductColorInBranch/${idbpc}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            if (data.value == 1) {
              console.log('Product successfully deleted');
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
              })
            }
          })
          .catch(error => {
            console.error('Error deleting product:', error);
          });
      }
    });
  }



  return (
    <div className="pcb-container" key={key}>
      <form onSubmit={handleSubmit}>
        <div className="pcb-item">
          <select
            id="product-color"
            name="product-color"
            className="select-color"
            value={idBranch}
            onChange={(e) => setIdBranch(e.target.value)}
            disabled={idbpc ? true : false}
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
            value={data.idPC}
            onChange={(e) => setIdProductColor(e.target.value)}
            disabled={idbpc ? true : false}
          />
        </div>

        <div className="pcb-item">
          <label htmlFor="product-name">Tên sản phẩm: {data.nameProduct}</label>
        </div>
        <div className="pcb-item">
          <label htmlFor="product-color">Màu sắc: {data.color} </label>
        </div>

        <div className="pcb-item">
          <label htmlFor="product-price">Giá: {data.price} </label>
        </div>
        <div className="pcb-item">
          <label htmlFor="product-quantity">Số lượng:  </label>
          <input
            type="number"
            id="product-quantity"
            value={data.amount}
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
