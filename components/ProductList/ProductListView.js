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
  Toast,
  Right,
  Body,
  List,
  ListItem,
  Text
} from "native-base";

//Import Product Store
import ProductStore from "../Store/ProductStore";
import CartStore from "../Store/CartStore";
import UsersList from "./UsersList";

class ProductListView extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: ProductStore.filteredProducts
    };
  }
  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    let productList;
    if (ProductStore.filteredProducts.length > 0) {
      productList = ProductStore.filteredProducts.map((product, index) => (
        <SwipeRow
          disableRightSwipe={
            (product.quantity > 0) & (product.status.name !== "Cancelled")
              ? false
              : true
          }
          key={index}
          leftOpenValue={75}
          rightOpenValue={-75}
          left={
            (product.quantity > 0) & (product.status.name !== "Cancelled") && (
              <Button
                success
                onPress={() => {
                  CartStore.addCart(product, 1);
                  ProductStore.removeQuantityFromProduct(product.id);
                  Toast.show({
                    text: `Added ${product.name} to Cart`,
                    type: "success",
                    duration: 500,
                    position: "bottom"
                  });
                }}
              >
                <Icon active name="add" />
              </Button>
            )
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
                      product.status.name === "Cancelled" ||
                      product.quantity === 0
                        ? "maroon"
                        : "black"
                  }}
                >
                  {" "}
                  {product.status.name === "Cancelled"
                    ? "Cancelled"
                    : product.quantity > 0
                      ? "Available"
                      : "Sold Out"}{" "}
                  @ {product.price} K.D.
                </Text>
              </View>
              {product.quantity === 0 ||
              product.status.name === "Cancelled" ? null : (
                <Text>{product.quantity} remaining</Text>
              )}
            </Link>
          }
          right={
            <Link component={Button} to={"/product/" + index} warning>
              <Icon active name="list" />
            </Link>
          }
        />
      ));
    } else if (ProductStore.products.length > 0) {
      productList = <Text>No Products Show Up In Filter...</Text>;
    } else {
      productList = <Text>Loading Products...</Text>;
    }

    return <View>{productList}</View>;
  }
}

export default observer(ProductListView);
