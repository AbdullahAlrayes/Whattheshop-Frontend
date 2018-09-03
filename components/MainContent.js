import React, { Component } from "react";

// NativeBase
import { Content } from "native-base";

// Component
import Login from "./Login";
import Profile from "./Profile";
import Lol from "./Lol";
import PrivateLul from "./PrivateLul";
import addProduct from "./AddProducts/addProducts";
import ProductListView from "./ProductList/ProductListView";
import ProductDetail from "./ProductDetail/ProductDetail";
import addTags from "./AddProducts/addTags";

// Router
import { Route, Switch, Redirect } from "react-router-native";

// Common
import PrivateRoute from "../common/PrivateRoute";

//Stores
import ProductStore from "./Store/ProductStore";

class MainContent extends Component {
  render() {
    return (
      <Content>
        <Switch>
          <Route path="/addProduct" component={addProduct} />
          <Route path="/productLists" component={ProductListView} />
          <Route path="/product/:productID" component={ProductDetail} />
          <PrivateRoute path="/privateLul" component={PrivateLul} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/addTag/:tagID" component={addTags} />
          <Route path="/login" component={Login} />
          <Redirect to="/productLists" />
        </Switch>
      </Content>
    );
  }
}

export default MainContent;
