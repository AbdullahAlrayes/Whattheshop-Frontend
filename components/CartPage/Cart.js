import React, { Component } from "react";
import { Image, ScrollView, Keyboard, DeviceEventEmitter } from "react-native";
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
  Input,
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
import OrderStore from "../Store/OrderSNStore";

class MyCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discountClicked: false,
      maxOrderID: OrderStore.orederSN[0].id
    };
  }

  UploadCart(promise) {
    let j;
    let i;
    let finalOrderList = [];
    for (j = 0; j < CartStore.items.length; j++) {
      let prodID = "0" + CartStore.items[j].id;
      for (i = 0; prodID.length < 6; i++) {
        prodID = 0 + prodID;
      }
      let quantID = "0" + CartStore.items[j].quantity;
      for (i = 0; quantID.length < 6; i++) {
        quantID = 0 + quantID;
      }
      let priceID =
        "0" + CartStore.items[j].price * (1 - CartStore.discountConfirmation);
      for (i = 0; priceID.length < 6; i++) {
        priceID = 0 + priceID;
      }
      let orderSN;
      orderSN = "" + prodID + quantID + priceID;
      CartStore.uploadFinalOrder(orderSN);
      finalOrderList.push(+this.state.maxOrderID + i);
    }
    console.log(finalOrderList);
  }

  render() {
    let cartItemsListed;
    cartItemsListed = CartStore.items.map((item, index) => (
      <CartItems itemID={item.id} key={index} />
    ));
    return (
      <View>
        {CartStore.discountConfirmation > 0 && (
          <Button success full>
            <Text style={{ fontWeight: "bold" }}>
              Successful Code = {CartStore.discountConfirmation * 100}% off
            </Text>
          </Button>
        )}
        <ScrollView style={{ minHeight: 90 }}>
          <Text> </Text>
          <Text> </Text>
          {cartItemsListed}

          <Button full info>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Total Price = {CartStore.totalPrice} K.D.
            </Text>
          </Button>
          <Button
            full
            success
            onPress={() => {
              let testPromise = console.log("start");
              testPromise
                .then(promise => this.UploadCart(promise))
                .then(res => CartStore.uploadOrder(3, finalOrderList))
                .then(res => console.log("done"));
            }}
          >
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
          <Text> </Text>
          <Button
            full
            warning
            onPress={() =>
              this.setState({ discountClicked: !this.state.discountClicked })
            }
          >
            <Text>Add a Discount Code</Text>
          </Button>
          {this.state.discountClicked && (
            <View>
              <Item rounded>
                <Input
                  placeholder="Write the Discount Code Here..."
                  onChangeText={inputVal => CartStore.updateDiscount(inputVal)}
                />
              </Item>

              <Button full transparent style={{ height: 600 }}>
                <Text> </Text>
              </Button>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default observer(MyCart);
