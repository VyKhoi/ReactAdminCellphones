import React from "react";
import Table from "../components/table/Table";
import productList from "../assets/JsonData/productJson.json";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";

import "./css/ProductWorkingPage.css";

import axios from "axios";
import { Image } from "cloudinary-react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// var productWithID = {
//   id: 1,
//   name: "Samsung J7",
//   manufacture: "Samsung",
//   type: "phone",
//   images: [
//     {
//       nameImage: "Xanh",
//       urls: "https://res.cloudinary.com/dl6y9cyqb/image/upload/v1682272442/sg3ippzaqpi9imkzku0p.jpg",
//     },
//     {
//       nameImage: "Đen",
//       urls: "https://res.cloudinary.com/dl6y9cyqb/image/upload/v1682272443/c5pwugnz14krhm1khree.png",
//     },
//   ],

//   title: "Chiếc ddiejn thoại tuyệt vời",
//   content: "Chiếc ddiejn thoại tuyệt vời lắm",
//   cpu: "ádv",
//   ram: "sadv",
//   rom: "ádv",
//   graphicCard: "",
//   battery: "ádv",
//   os: "ádv",
//   others: "ádvsdv",
// };

var productWithID = {};
// var productWithId = JSON.stringify(productJson);

const ProductWorkingPage = () => {
  const [typeUI, setTypeUI] = useState("phone");
  //   confix cloudynary
  const preset_key = "";
  const cloud_name = "";

  //  thực  hiện fectch xuống csdl để lấy tất cả thông tin sp
  const [name, setName] = useState("");
  const [manufacture, setManufacture] = useState("");
  const [type, setType] = useState("phone");
  const [file, setFile] = useState([]);
  const [descriptionImage, setDescriptionImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [cpu, setCpu] = useState("");
  const [ram, setRam] = useState("");
  const [rom, setRom] = useState("");
  const [graphicCard, setGraphicCard] = useState("");
  const [battery, setBattery] = useState("");
  const [os, setOs] = useState("");
  const [others, setOthers] = useState("");
  const [listLink, setListLink] = useState([]);

  // khu làm việc với sửa và xóa
  //  lấy id của sản phẩm
  const { id } = useParams();

  const [product, setProduct] = useState({});

  //   khu vực lấy data
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/product/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
        //  chỉ test xem thôi
        autoUpdateFrom(productWithID);
      }
    }
    fetchProduct();
  }, [id]);

  function autoUpdateFrom(data) {
    if (data.name) {
      setName(data.name);
    }
    if (data.manufacture) {
      setManufacture(data.manufacture);
    }
    if (data.type) {
      setType(data.type);
    }
    // if (data.images) {
    //   var link = [];
    //   for (var i = 0; i < data.images.length; i++) {
    //     link.push(data.images[i].urls);
    //   }
    //   setFile(link);

    //   var l = [];
    //   for (var i = 0; i < data.images.length; i++) {
    //     l.push(data.images[i].nameImage);
    //   }
    //   setDescriptionImage(l);
    // }

    // if (data.descriptionImage) {
    //   setDescriptionImage(data.descriptionImage);
    // }
    if (data.title) {
      setTitle(data.title);
    }
    if (data.content) {
      setContent(data.content);
    }
    if (data.cpu) {
      setCpu(data.cpu);
    }
    if (data.ram) {
      setRam(data.ram);
    }
    if (data.rom) {
      setRom(data.rom);
    }
    if (data.graphicCard) {
      setGraphicCard(data.graphicCard);
    }
    if (data.battery) {
      setBattery(data.battery);
    }
    if (data.os) {
      setOs(data.os);
    }
    if (data.others) {
      setOthers(data.others);
    }
  }

  function clearForm() {
    setName("");
    setManufacture("");
    setType("phone");
    setFile([]);
    setDescriptionImage("");
    setTitle("");
    setContent("");
    setCpu("");
    setRam("");
    setRom("");
    setGraphicCard("");
    setBattery("");
    setOs("");
    setOthers("");
  }

  // ///////////

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!id) {
      CheckSelectNameImage();
    }
    try {
      const urls = await uploadFiles();
      //   setListLink(urls);

      var dsImage = [];
      for (var i = 0; i < file.length; i++) {
        var tmp = { nameImage: descriptionImage[i], images: urls[i] };
        dsImage.push(tmp);
      }
      //   var dsImageJson = JSON.stringify(dsImage);
      const data = {
        id,
        name,
        manufacture,
        type,
        images: dsImage,

        title,
        content,
        cpu,
        ram,
        rom,
        graphicCard,
        battery,
        os,
        others,
      };
      const response = await fetch("https://localhost:8000/Admin/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log(responseData);
      clearForm();
    } catch (error) {
      console.log(error);
      clearForm();
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleManufactureChange = (event) => {
    setManufacture(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleFileChange = (event) => {
    const fileList = event.target.files;
    console.log(event.target.files);
    setFile(Array.from(fileList));
  };

  const uploadFiles = async () => {
    const formDataArray = file.map((f) => {
      const formData = new FormData();
      formData.append("upload_preset", "cellphonesvykhoi");
      formData.append("cloud_name", "dl6y9cyqb");
      formData.append("api_key", "357945813929283");
      formData.append("file", f);
      return formData;
    });

    try {
      const responses = await Promise.all(
        formDataArray.map((formData) =>
          axios.post(
            "https://api.cloudinary.com/v1_1/dl6y9cyqb/image/upload",
            formData
          )
        )
      );

      const urls = responses.map((response) => response.data.secure_url);
      console.log(urls);
      return urls;
      // Lưu đường dẫn của các hình ảnh đã upload vào database của bạn
    } catch (err) {
      console.error(err);
    }
  };

  //   const handleDescriptionImageChange = (event) => {
  //     setDescriptionImage(event.target.value);
  //   };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleCpuChange = (event) => {
    setCpu(event.target.value);
  };

  const handleRamChange = (event) => {
    setRam(event.target.value);
  };

  const handleRomChange = (event) => {
    setRom(event.target.value);
  };

  const handleGraphicCardChange = (event) => {
    setGraphicCard(event.target.value);
  };

  const handleBatteryChange = (event) => {
    setBattery(event.target.value);
  };

  const handleOsChange = (event) => {
    setOs(event.target.value);
  };

  const handleOthersChange = (event) => {
    console.log(others);
    setOthers(event.target.value);
  };

  //   xử lý xóa sản phẩm
  function DeleteHandle(idProduct) {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa comment này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
    }).then((result) => {
      if (result.isConfirmed) {
        clearForm();
      }
    });
  }

  function CheckSelectNameImage() {
    if (descriptionImage.length !== 2 || file.length !== 2) {
      Swal.fire({
        title: "Vui lòng chọn đúng 2 hình và chọn name cho hình ảnh",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          // clearForm();
          return;
        }
      });
    }
  }

  return (
    <div className="ProductWorkingPage__container">
      <div>
        {id && <p>Id của sản phẩm là: {id}</p>}
        {!id && <h1>Không có sản phẩm</h1>}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="productBase_container">
          <div>
            <label htmlFor="name">Name:</label>

            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="manufacture">Manufacture:</label>
            <input
              type="text"
              id="manufacture"
              value={manufacture}
              onChange={(event) => setManufacture(event.target.value)}
            />
          </div>
          <div
            style={{
              pointerEvents: id ? "none" : "auto",
            }}
          >
            <label htmlFor="type">Type:</label>
            <select
              className="selectType"
              id="type"
              value={typeUI}
              onChange={(event) => setTypeUI(event.target.value)}
            >
              <option value="phone">Phone</option>
              <option value="laptop">Laptop</option>
            </select>
          </div>
        </div>

        <div className="productBaseImage_container">
          <div
            className="productBaseImage_container_item"
            style={{
              display: id ? "none" : "block",
            }}
          >
            <label htmlFor="files">Files:</label>
            <input
              type="file"
              id="files"
              multiple
              //   value={file}
              onChange={handleFileChange}
            />

            <div>
              <h3>Select mô tả màu sản phẩm</h3>
              {file.map((fileItem, index) => (
                <div key={index}>
                  <label>{fileItem.name}</label>
                  <select
                    name="descriptionImage"
                    value={descriptionImage[index]}
                    className="selectType"
                    onChange={(event) => {
                      const updatedArray = [...descriptionImage];
                      updatedArray[index] = event.target.value;
                      setDescriptionImage(updatedArray);
                    }}
                    disabled={Object.keys(productWithID).length !== 0}
                  >
                    'Đen' 'Trắng' 'Vàng' 'Xám' 'Xanh'
                    <option value="">-- Select an option --</option>
                    <option value="Đen">Đen</option>
                    <option value="Trắng">Trắng</option>
                    <option value="Vàng">Vàng</option>
                    <option value="Xám">Xám</option>
                    <option value="Xanh">Xanh</option>
                    {/* Thêm các tùy chọn khác nếu cần */}
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div className="productBaseImage_container_item">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <h3 htmlFor="content">Content:</h3>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
            ></textarea>
          </div>
        </div>

        {/*Thông số của laptop*/}
        {typeUI === "laptop" && (
          <div className="productBaseSpecifications_container">
            <h1>Các thông số kỹ thuật</h1>
            <div className="productBaseSpecifications_container_item">
              <label htmlFor="cpu">CPU:</label>
              <input
                type="text"
                id="cpu"
                name="CPU"
                value={cpu}
                onChange={handleCpuChange}
              />

              <label htmlFor="ram">RAM:</label>
              <input
                type="text"
                id="ram"
                name="RAM"
                value={ram}
                onChange={handleRamChange}
              />

              <label htmlFor="rom">ROM:</label>
              <input
                type="text"
                id="rom"
                name="ROM"
                value={rom}
                onChange={handleRomChange}
              />
            </div>
            <div className="productBaseSpecifications_container_item">
              <label htmlFor="graphic_card">Card đồ họa:</label>
              <input
                type="text"
                id="graphic_card"
                name="Graphic_Card"
                value={graphicCard}
                onChange={handleGraphicCardChange}
              />

              <label htmlFor="battery">Pin:</label>
              <input
                type="text"
                id="battery"
                name="Battery"
                value={battery}
                onChange={handleBatteryChange}
              />

              <label htmlFor="os">Hệ điều hành:</label>
              <input
                type="text"
                id="os"
                name="Operating_System"
                value={os}
                onChange={handleOsChange}
              />
            </div>
            <div className="productBaseSpecifications_container_item_orther">
              <label htmlFor="others">Khác:</label>

              <textarea
                id="others"
                name="Others"
                value={others}
                onChange={handleOthersChange}
              ></textarea>
            </div>
          </div>
        )}

        {/*Thông số của điện thoại*/}
        {typeUI == "phone" && (
          <div className="productBaseSpecifications_container">
            <h1>Các thông số kỹ thuật</h1>
            <div className="productBaseSpecifications_container_item">
              <label htmlFor="cpu">CPU:</label>
              <input
                type="text"
                id="cpu"
                name="CPU"
                value={cpu}
                onChange={handleCpuChange}
              />

              <label htmlFor="ram">RAM:</label>
              <input
                type="text"
                id="ram"
                name="RAM"
                value={ram}
                onChange={handleRamChange}
              />

              <label htmlFor="rom">ROM:</label>
              <input
                type="text"
                id="rom"
                name="ROM"
                value={rom}
                onChange={handleRomChange}
              />
            </div>
            <div className="productBaseSpecifications_container_item">
              <label htmlFor="battery">Pin:</label>
              <input
                type="text"
                id="battery"
                name="Battery"
                value={battery}
                onChange={handleBatteryChange}
              />

              <label htmlFor="os">Hệ điều hành:</label>
              <input
                type="text"
                id="os"
                name="Operating_System"
                value={os}
                onChange={handleOsChange}
              />
            </div>
            <div className="productBaseSpecifications_container_item_orther">
              <label htmlFor="others">Khác:</label>

              <textarea
                id="others"
                name="Others"
                value={others}
                onChange={handleOthersChange}
              ></textarea>
            </div>
          </div>
        )}

        <button className="submit_button" type="submit">
          Submit
        </button>

        {id ? (
          <button
            className="submit_button delete_button"
            type="button"
            onClick={() => DeleteHandle(productWithID.id)}
          >
            Xóa
          </button>
        ) : null}
      </form>
    </div>
  );
};

export default ProductWorkingPage;
