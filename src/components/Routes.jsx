import React from "react";

import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Products from "../pages/Products";
import ProductWorkingPage from "../pages/ProductWorkingPage";
import ProductColor from "../pages/ProductColor";
import ProductColorWorkingPage from "../pages/ProductColorWorkingPage";
import ProductColorBranch from "../pages/ProductColorBranch";
import ProductColorBranchWorkingPage from "../pages/ProductColorBranchWorkingPage";
import StatisticalPage from "../pages/StatisticalPage";
import StatisticalMonthOfBranch from "../pages/StatisticalMonthOfBranch";
import StatisticalCommonProductSales from "../pages/StatisticalCommonProductSales";
import Login from "../pages/UserLogin";
import Layout from "./layout/Layout";
const Routes = () => {
  return (
    <Switch>
      {/* <Redirect to="/login" /> */}
      <Route path="/" exact component={Dashboard} />
      <Route exact path="/layout" component={Dashboard} />

      <Route path="/customers" component={Customers} />
      <Route path="/products" component={Products}></Route>
      <Route path="/products-color" component={ProductColor}></Route>
      <Route
        path="/products-color-branch"
        component={ProductColorBranch}
      ></Route>
      <Route path="/statistical" component={StatisticalPage}></Route>
      <Route
        path="/statisticalMonthOfBranch"
        component={StatisticalMonthOfBranch}
      ></Route>
      <Route
        path="/statisticalCommonProductSales"
        component={StatisticalCommonProductSales}
      ></Route>

      <Route
        path="/productColorsWorkingPage/:idPC?"
        component={ProductColorWorkingPage}
      ></Route>
      <Route path="/productsWorkingPage/:id?" component={ProductWorkingPage} />

      <Route
        path="/productColorBranchWorkingPage/:idbpc?"
        component={ProductColorBranchWorkingPage}
      />
    </Switch>
  );
};

export default Routes;
