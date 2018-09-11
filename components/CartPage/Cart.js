import React, { Component } from "react";
import {
  Image,
  ScrollView,
  Alert,
  Keyboard,
  DeviceEventEmitter
} from "react-native";
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
import {
  NativeRouter,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-native";

//Store
import ProductStore from "../Store/ProductStore";
import CartStore from "../Store/CartStore";
import UserStore from "../Store/UserStore";
import { observer } from "mobx-react";
import CartItems from "./CartItems";
import OrderStore from "../Store/OrderSNStore";
import authStore from "../Store/authStore";

class MyCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      basic: true,
      discountClicked: false,
      maxOrderID: OrderStore.orderSN[0].id + 1,
      finalOrderSNCombined: null
    };
  }
  _showAlert = () => {
    Alert.alert(
      "Checkout Confirmation",
      "Are you sure you want to Checkout?",
      [
        {
          text: "Yes",
          onPress: () => {
            let userID = authStore.user.user_id;
            let userStoreIndex = UserStore.users.findIndex(
              user => user.id === userID
            );
            let currentUser = UserStore.users[userStoreIndex];
            let productObject = [];
            let indexVal;
            for (let i = 0; i < CartStore.items.length; i++) {
              indexVal = ProductStore.products.findIndex(
                product => product.id === CartStore.items[i].id
              );
              productObject.push({
                id: CartStore.items[i].id,
                remainingQuant: ProductStore.products[indexVal].quantity,
                orderQuant: CartStore.items[i].quantity
              });
            }

            CartStore.uploadOrder(
              currentUser.id,
              this.state.finalOrderSNCombined,
              productObject
            );
          }
        },
        {
          text: "No, Take Me Back!",
          onPress: () => console.log("Ask me later pressed")
        }
      ],
      { cancelable: false }
    );
  };
  UploadCart() {
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
      finalOrderList.push(+this.state.maxOrderID + j);
    }
    this.setState({ finalOrderSNCombined: finalOrderList });
  }

  render() {
    if (!authStore.isAuthenticated) {
      alert("Please Log In to Add Items to Cart");
      return <Redirect to="/login" />;
    }
    let cartItemsListed;
    cartItemsListed = CartStore.items.map((item, index) => (
      <CartItems itemID={item.id} key={index} />
    ));
    return (
      <View>
        {CartStore.discountConfirmation > 0 && (
          <Button success full>
            <Text style={{ fontWeight: "bold" }}>
              Discount Accepted, you get {CartStore.discountConfirmation * 100}%
              off
            </Text>
          </Button>
        )}
        <Button full info>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Total Price = {CartStore.totalPrice} K.D.
          </Text>
        </Button>
        <ScrollView style={{ minHeight: 90 }}>
          {cartItemsListed}
          {CartStore.items.length > 0 ? (
            <Button
              full
              success
              onPress={() => {
                this.UploadCart();
                this._showAlert();
              }}
            >
              <Text>CheckOut</Text>
            </Button>
          ) : (
            <Button full light disabled>
              <Text>No Items in Cart</Text>
            </Button>
          )}
          <Text> </Text>

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
          <Text note>
            Disclaimer: Due to limited quantity of sold items, the cart will not
            save once the application is closed.
          </Text>
        </ScrollView>
      </View>
    );
  }
}

export default observer(MyCart);
