import React, { Component } from "react";
import { observer } from "mobx-react";
import { NativeRouter, Route, Link, Switch } from "react-router-native";

import { ListView } from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Input,
  Grid,
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
      basic: true
    };
  }
  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    let cartList;
    if (CartStore.items.length > 0) {
      cartList = CartStore.items.map((product, index) => (
        <SwipeRow
          key={index}
          leftOpenValue={75}
          rightOpenValue={-75}
          left={
            <Button
              danger
              onPress={() => {
                let name = product.name;
                CartStore.removeItem(index);
                alert(`Removed ${name} to Cart`);
              }}
            >
              <Icon active name="trash" />
            </Button>
          }
          body={
            <Link component={Button} to={"/product/" + index} transparent>
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
                  {product.status.name}
                </Text>
              </View>

              <Text style={{ color: "black" }}>{product.price} K.D.</Text>
            </Link>
          }
          right={
            <Link component={Button} to={"/product/" + index} warning>
              <Icon active name="list" />
            </Link>
          }
        />
      ));
    } else {
      cartList = <Text>No Items in Cart</Text>;
    }

    return <View>{cartList}</View>;
  }
}

export default observer(CartItems);
