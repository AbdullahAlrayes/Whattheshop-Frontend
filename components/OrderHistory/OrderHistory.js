import React, { Component } from "react";
import {
  Dimensions,
  AsyncStorage,
  Image,
  TextInput,
  ScrollView,
  FlatList,
  Platform
} from "react-native";
import { observer } from "mobx-react";
import moment from "moment";
import { NativeRouter, Route, Link, Switch } from "react-router-native";

import {
  Container,
  Header,
  Content,
  Card,
  View,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Tab,
  List,
  ListItem,
  Tabs,
  ScrollableTab,
  Icon,
  Left,
  SwipeRow,
  Toast,
  Body,
  Right
} from "native-base";

//Store
import OrderSNStore from "../Store/OrderSNStore";
import ProductStore from "../Store/ProductStore";
import UserStore from "../Store/UserStore";
import CartStore from "../Store/CartStore";
import OrderTabs from "./OrderTabs";

class OrderHistory extends Component {
  render() {
    console.log(OrderSNStore.maxOrdersForUser);
    let ordersPrice;
    let userID = OrderSNStore.userID;
    let prodID = 0;
    let quantID = 0;
    let priceID = 0;

    ordersPrice = OrderSNStore.orderItems.map((order, index) => (
      <Link
        key={index}
        to={
          "/product/" +
          ProductStore.products.findIndex(
            product => product.id === order.prodID
          )
        }
      >
        <List>
          <ListItem>
            {ProductStore.products[
              ProductStore.products.findIndex(
                product => product.id === order.prodID
              )
            ].pic && (
              <Thumbnail
                source={{
                  uri:
                    ProductStore.products[
                      ProductStore.products.findIndex(
                        product => product.id === order.prodID
                      )
                    ].pic
                }}
              />
            )}
            {!ProductStore.products[
              ProductStore.products.findIndex(
                product => product.id === order.prodID
              )
            ].pic && (
              <Thumbnail
                source={{
                  uri:
                    "https://www.2checkout.com/upload/images/graphic_product_tangible.png"
                }}
              />
            )}
            <Body>
              <Text>
                {
                  ProductStore.products[
                    ProductStore.products.findIndex(
                      product => product.id === order.prodID
                    )
                  ].name
                }
              </Text>
              <Text note>Quantity = {order.quantID}</Text>
            </Body>
            <Text>@ {order.priceID} K.D. per Item</Text>
          </ListItem>
        </List>
      </Link>
    ));
    let orderListStuff;
    let i;
    return (
      <Content>
        <Card style={{ justifyContent: "center" }}>
          <OrderTabs />
        </Card>
        <Card>{ordersPrice}</Card>
        <Button full disabled light>
          <Text>
            Total Paid ={" "}
            {OrderSNStore.filteredUserOrders[OrderSNStore.selectedOrder].price}{" "}
            K.D.
          </Text>
        </Button>
        <Button full disabled dark>
          <Text>
            Date Created ={" "}
            {moment(
              OrderSNStore.filteredUserOrders[OrderSNStore.selectedOrder]
                .created_on
            ).format("DD-MMM-YY")}
          </Text>
        </Button>
      </Content>
    );
  }
}
export default observer(OrderHistory);
