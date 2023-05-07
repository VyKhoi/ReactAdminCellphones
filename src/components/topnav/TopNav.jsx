import React, { useContext } from "react";

import "./topnav.css";

import { Link } from "react-router-dom";

import Dropdown from "../dropdown/Dropdown";

import ThemeMenu from "../thememenu/ThemeMenu";

import notifications from "../../assets/JsonData/notification.json";

import image from "../../assets/images/tuat.png";

import user_menu from "../../assets/JsonData/user_menus.json";
import { UserContext } from "../../context/userLogin/userLogin";
import { useHistory, Redirect } from "react-router-dom";
var imageUser = { image: image };
const renderNotificationItem = (item, index) => (
  <div className="notification-item" key={index}>
    <i className={item.icon}></i>
    <span>{item.content}</span>
  </div>
);

const renderUserToggle = (user) => (
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      <img src={imageUser.image} alt="" />
    </div>
    <div className="topnav__right-user__name">{user.name}</div>
  </div>
);

const Topnav = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const handleGoBack = () => {
    localStorage.removeItem("user");

    history.go(0);
  };

  const renderUserMenu = (item, index) => {
    if (item.content === "Profile") {
      return (
        <Link to="/profile" key={index}>
          <div className="notification-item">
            <i className={item.icon}></i>
            <span>{item.content}</span>
          </div>
        </Link>
      );
    }
    if (item.content === "Settings") {
      return (
        <Link to="/settings" key={index}>
          <div className="notification-item">
            <i className={item.icon}></i>
            <span>{item.content}</span>
          </div>
        </Link>
      );
    }

    if (item.content === "Logout") {
      return (
        <div key={index} onClick={handleGoBack}>
          <div className="notification-item">
            <i className={item.icon}></i>
            <span>{item.content}</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="topnav">
      <div className="topnav__search">
        <input type="text" placeholder="Search here..." />
        <i className="bx bx-search"></i>
      </div>
      <div className="topnav__right">
        <div className="topnav__right-item">
          {/* dropdown here  */}
          <Dropdown
            customToggle={() => renderUserToggle(user)}
            contentData={user_menu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
          {/* <div>
            <img src=""
          </div>
          <ul>
            <li>Profile</li>
            <li>Settings</li>
            <li>Logout</li>
          </ul> */}
        </div>
        <div className="topnav__right-item">
          <Dropdown
            icon="bx bx-bell"
            badge="12"
            contentData={notifications}
            renderItems={(item, index) => renderNotificationItem(item, index)}
            renderFooter={() => <Link to="/">View All</Link>}
          />
          {/* dropdown here */}
        </div>
        <div className="topnav__right-item">
          <ThemeMenu />
        </div>
      </div>
    </div>
  );
};

export default Topnav;
