import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import { createStore } from "redux";

import { Provider } from "react-redux";

import rootReducer from "./redux/reducers";

import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./assets/css/grid.css";
import "./assets/css/theme.css";
import "./assets/css/index.css";

import Layout from "./components/layout/Layout";
import { Route, Switch, Redirect, HashRouter } from "react-router-dom";
import Login from "./pages/UserLogin";
import UserContextProvider from "./context/userLogin/userLogin";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import ProductColor from "./pages/ProductColor";
import Products from "./pages/Products";
// import { UserContext } from "./context/userLogin/userLogin.jsx";
const store = createStore(rootReducer);

document.title = "Tua CRM";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const { user, setUser } = useContext(UserContext);
  return (
    <Provider store={store}>
      <React.StrictMode>
        <UserContextProvider>
          <HashRouter>
            <Switch>
              <Route
                path="/login"
                exact
                render={(props) => (
                  <Login {...props} setIsLoggedIn={setIsLoggedIn} />
                )}
              />

              {isLoggedIn ? (
                <Route path="/layout" component={Layout} />
              ) : (
                <Redirect to="/login" />
              )}
            </Switch>
          </HashRouter>
        </UserContextProvider>
      </React.StrictMode>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

reportWebVitals();
