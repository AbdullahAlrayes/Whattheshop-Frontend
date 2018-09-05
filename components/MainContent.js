import React, { Component } from "react";

// NativeBase
import { Content, View, Container } from "native-base";

// Component
import Login from "./Login";
import Profile from "./Profile";
import Lol from "./Lol";
import PrivateLul from "./PrivateLul";
import addProduct from "./AddProducts/addProducts";
import ProductListView from "./ProductList/ProductListView";
import FullListView from "./ProductList/FullListView";
import ProductDetail from "./ProductDetail/ProductDetail";
import addTags from "./AddProducts/addTags";
import UserDetail from "./UserDetail/UserDetail";
import Cart from "./CartPage/Cart";

// Router
import { Route, Switch, Redirect } from "react-router-native";

// Common
import PrivateRoute from "../common/PrivateRoute";

//Stores
import ProductStore from "./Store/ProductStore";

class MainContent extends Component {
  render() {
    return (
      <Container>
        <Switch>
          <Route path="/addProduct" component={addProduct} />
          <Route path="/productLists" component={FullListView} />
          <Route path="/product/:productID" component={ProductDetail} />
          <Route path="/user/:userID" component={UserDetail} />
          <PrivateRoute path="/privateLul" component={PrivateLul} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/addTag/:tagID" component={addTags} />
          <Route path="/login" component={Login} />
          <Route path="/cart" component={Cart} />
          <Redirect to="/productLists" />
        </Switch>
      </Container>
    );
  }
}

export default MainContent;
