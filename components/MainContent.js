import React, { Component } from "react";

// NativeBase
import { Content, View, Container, Root } from "native-base";
import { LinearGradient } from "expo";

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
import addTags2 from "./UpdateProduct/addTags";
import UserDetail from "./UserDetail/UserDetail";
import Cart from "./CartPage/Cart";
import TestPage from "./TestPage";
import OrderHistory from "./OrderHistory/OrderHistory";
import updateProduct from "./UpdateProduct/updateProduct";
import RegisterPage from "./Register";

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
        <Root>
          <Switch>
            <Route path="/addProduct" component={addProduct} />
            <Route path="/productLists" component={FullListView} />
            <Route path="/product/:productID" component={ProductDetail} />
            <Route path="/productupdate/:productID" component={updateProduct} />
            <Route path="/user/:userID" component={UserDetail} />
            <PrivateRoute path="/privateLul" component={PrivateLul} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={RegisterPage} />

            <Route path="/orders" component={OrderHistory} />
            <Route path="/addTag/:tagID" component={addTags} />
            <Route path="/addTag2/:tagID" component={addTags2} />
            <Route path="/cart" component={Cart} />
            <Redirect to="/productLists" />
          </Switch>
        </Root>
      </Container>
    );
  }
}

export default MainContent;
