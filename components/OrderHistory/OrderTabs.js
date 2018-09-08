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
  Segment,
  Tab,
  Tabs,
  ScrollableTab,
  Icon,
  Left,
  SwipeRow,
  Toast,
  Body,
  Right
} from "native-base";
import { ListView } from "react-native";

//Store
import OrderSNStore from "../Store/OrderSNStore";
import UserStore from "../Store/UserStore";
import CartStore from "../Store/CartStore";

class OrderTabs extends Component {
  render() {
    let numberOfOrders;
    numberOfOrders = OrderSNStore.filteredUserOrders.map((order, index) => (
      <Button
        key={index}
        first
        active={OrderSNStore.selectedOrder === index}
        onPress={() => (OrderSNStore.selectedOrder = index)}
      >
        <Text>Order {OrderSNStore.maxOrdersForUser - index}</Text>
      </Button>
    ));

    let orderListStuff;
    let i;
    return (
      <ScrollView horizontal>
        <Segment style={{ justifyContent: "flex-end" }}>
          {numberOfOrders}
        </Segment>
      </ScrollView>
    );
  }
}
export default observer(OrderTabs);
