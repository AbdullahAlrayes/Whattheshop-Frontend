import React, { Component } from "react";
import { Image, ScrollView } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  View,
  CardItem,
  Item,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
import { NativeRouter, Route, Link, Switch } from "react-router-native";

//Store
import ProductStore from "../Store/ProductStore";
import CartStore from "../Store/CartStore";
import UserStore from "../Store/UserStore";
import { observer } from "mobx-react";
import CartItems from "./CartItems";

class MyCart extends Component {
  render() {
    return (
      <View>
        <ScrollView style={{ minHeight: 90 }}>
          <Text> </Text>

          <CartItems />
        </ScrollView>
        <Button full info>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Total Price = {CartStore.totalPrice} K.D.
          </Text>
        </Button>
        <Button full success onPress={() => alert("Checkout Completed")}>
          <Text>CheckOut</Text>
        </Button>
        <Text> </Text>
        <Button
          full
          danger
          onPress={() => {
            CartStore.resetCart();
            alert("All items in cart have been Dropped");
          }}
        >
          <Text>Drop All Cart Items</Text>
        </Button>
      </View>
    );
  }
}

export default observer(MyCart);
