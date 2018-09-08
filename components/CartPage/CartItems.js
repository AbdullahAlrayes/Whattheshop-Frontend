import React, { Component } from "react";
import { observer } from "mobx-react";
import { NativeRouter, Route, Link, Switch } from "react-router-native";

import { ListView, Alert } from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Input,
  Grid,
  Badge,
  Col,
  Thumbnail,
  Icon,
  SwipeRow,
  Segment,
  View,
  Left,
  Right,
  Body,
  List,
  ListItem,
  Toast,
  Text
} from "native-base";

//Import Product Store
import ProductStore from "../Store/ProductStore";
import CartStore from "../Store/CartStore";

class CartItems extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      showToast: false,
      itemIndexVal: null,
      productID: null,
      cartQuant: null
    };
  }

  _showAlert = () => {
    Alert.alert(
      "Delete Confirmation",
      "Are you sure you want to delete?",
      [
        {
          text: "Yes Delete",
          onPress: () => {
            this.setState({
              cartQuant: CartStore.items[this.state.itemIndexVal].quantity
            });
            CartStore.removeItem(
              this.state.itemIndexVal,
              CartStore.items[this.state.itemIndexVal].newPrice
            );
            ProductStore.removeFromCart(
              this.state.productID,
              this.state.cartQuant
            );
          }
        },
        {
          text: "No Do Not Delete!",
          onPress: () => console.log("Ask me later pressed")
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    let cartList;
    let indexVal = ProductStore.products.findIndex(
      product => product.id === this.props.itemID
    );
    let itemIndex = CartStore.items.findIndex(
      item => item.id === this.props.itemID
    );

    if (indexVal > -0.5) {
      let product = ProductStore.products[indexVal];

      cartList = (
        <SwipeRow
          leftOpenValue={75}
          rightOpenValue={-75}
          left={
            <Button
              danger
              onPress={() => {
                this.setState({
                  itemIndexVal: itemIndex,
                  productID: product.id
                });
                this._showAlert();
              }}
            >
              <Icon active name="trash" />
            </Button>
          }
          body={
            <Button transparent>
              {product.pic && <Thumbnail source={{ uri: product.pic }} />}
              {!product.pic && (
                <Thumbnail
                  source={{
                    uri:
                      "https://www.2checkout.com/upload/images/graphic_product_tangible.png"
                  }}
                />
              )}
              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    color:
                      product.status.name === "Cancelled" ? "maroon" : "black"
                  }}
                >
                  {" "}
                  {product.name}
                </Text>
                <Text
                  note
                  style={{
                    color:
                      product.status.name === "Cancelled" ? "maroon" : "black"
                  }}
                >
                  {" "}
                  {product.status.name} @{" "}
                  <Text style={{ color: "black" }}>
                    {CartStore.items[itemIndex].newPrice} K.D.
                  </Text>
                </Text>
              </View>
              <Button
                small
                rounded
                disabled={CartStore.items[itemIndex].quantity === 1}
                danger
                light={CartStore.items[itemIndex].quantity === 1}
                onPress={() => {
                  ProductStore.addQuantityFromProduct(product.id);
                  CartStore.removeCart(product, 1);
                  Toast.show({
                    text: `1 ${product.name} removed from Cart`,
                    type: "danger",
                    duration: 500
                  });
                }}
              >
                <Text>-</Text>
              </Button>
              <Badge success>
                <Text style={{ fontWeight: "bold" }}>
                  {CartStore.items[itemIndex].quantity}
                </Text>
              </Badge>
              <Button
                small
                rounded
                success
                disabled={product.quantity === 0}
                light={product.quantity === 0}
                onPress={() => {
                  ProductStore.removeQuantityFromProduct(product.id);
                  CartStore.addCart(product, 1);
                  Toast.show({
                    text: `1 ${product.name} added to Cart`,
                    type: "success",
                    duration: 500
                  });
                }}
              >
                <Text>+</Text>
              </Button>
            </Button>
          }
          right={
            <Link component={Button} to={"/product/" + indexVal} warning>
              <Icon active name="list" />
            </Link>
          }
        />
      );
    }

    return <View>{cartList}</View>;
  }
}

export default observer(CartItems);
