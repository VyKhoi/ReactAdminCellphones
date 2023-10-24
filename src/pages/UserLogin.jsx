import React, { Fragment, useRef, useEffect, useContext } from "react";
import "./css/StyleLogin.css";
import styles from "./css/bootstrap.min.css";

import { Container } from "react-bootstrap";

import { useState } from "react";

import { UserContext } from "../context/userLogin/userLogin";
import Layout from "../components/layout/Layout";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
function Login(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const [userName, setUsername] = useState(null);
  const [passWord, setPassword] = useState(null);

  const [checkLogin, setCheckLogin] = useState(1);

  function handleSubmit(event) {
    console.log({ userName, passWord });

    event.preventDefault();
    fetch("https://localhost:7242/api/v1/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, passWord }),
      mode: "cors",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("dât fetch dc", data);
        // let user_curent = JSON.parse(data.data); //dôi tuong

        // localStorage.setItem("user", JSON.stringify(user_curent)); // luu vao local json
        setUser(data.data);
        console.log("user trong context ", user);
        setCheckLogin(1);

        if (user && user.userRoles[0] === "manager") {
          console.log("co vô đây");
          props.setIsLoggedIn(true);
          history.push("/layout");
        }
        setCheckLogin(0);
      })
      .catch((error) => {
        console.error(error);
        console.log("no bi loi");
        setCheckLogin(0);
      });
  }

  return (
    <div>
      <Container className="container_login_box d-block">
        <div className="d-lg-flex half container_login">
          <div
            className="bg order-1 order-md-2 img_login"
            style={{
              backgroundImage:
                "url('https://wallpaperaccess.com/full/210902.jpg')",
            }}
          ></div>
          <div className="contents order-2 order-md-1">
            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-7">
                  <h3>
                    Login to <strong>Colorlib</strong>
                  </h3>
                  <p className="mb-4">
                    Lorem ipsum dolor sit amet elit. Sapiente sit aut eos
                    consectetur adipisicing.
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group first">
                      <label for="username">Username</label>
                      <input
                        type="text"
                        placeholder="Email"
                        value={userName}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="form-group last mb-3">
                      <label for="password">Password</label>
                      <input
                        type="password"
                        placeholder="Password"
                        value={passWord}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {checkLogin === 0 && (
                      <p className="msgNotification" style={{ color: "red" }}>
                        <i class="fa-sharp fa-solid fa-lock"></i> thông tin sai,
                        xin nhập lại
                      </p>
                    )}

                    <button
                      type="submit"
                      value="Log In"
                      className="btn btn-block btn-primary login_bt"
                    >
                      Đăng Nhập
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Login;
