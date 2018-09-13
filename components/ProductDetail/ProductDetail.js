import React, { Component } from "react";
import { Image, ScrollView } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  View,
  Right,
  Toast,
  Badge,
  Input
} from "native-base";
import { NativeRouter, Route, Link, Switch } from "react-router-native";

//Store
import ProductStore from "../Store/ProductStore";
import CartStore from "../Store/CartStore";
import UpdateProductStore from "../Store/UpdateProductStore";
import UserStore from "../Store/UserStore";
import { observer } from "mobx-react";
import authStore from "../Store/authStore";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      name: ProductStore.products[this.props.match.params.productID],
      type: ""
    };
  }
  componentDidMount() {
    console.log(this.props.match.params.productID);
  }

  render() {
    const product = ProductStore.products[this.props.match.params.productID];

    let existingTags;
    if (product.tag.length > 0) {
      existingTags = product.tag.map((tag, index) => (
        <Button key={index} transparent>
          <Badge style={{ backgroundColor: "grey", flexDirection: "row" }}>
            <Text>{tag.name}</Text>
          </Badge>
        </Button>
      ));
    }

    return (
      <Content>
        <Card style={{ width: "95%", alignSelf: "center" }}>
          {product.created_by.id === UserStore.signedInUser.user_id && (
            <Link
              component={Button}
              to={"/productupdate/" + this.props.match.params.productID}
              full
              warning
              onPress={() =>
                UpdateProductStore.updateStoreItems(
                  this.props.match.params.productID
                )
              }
            >
              <Text style={{ fontWeight: "bold" }}>Update Product</Text>
            </Link>
          )}
          <CardItem>
            <Left>
              {!product.created_by.profile ||
              !product.created_by.profile.pic ? (
                <Thumbnail
                  source={{
                    uri:
                      "http://profilepicturesdp.com/wp-content/uploads/2018/07/empty-user-profile-picture-3-200x200.jpg"
                  }}
                />
              ) : (
                <Thumbnail source={{ uri: product.created_by.profile.pic }} />
              )}
              <Body>
                <Text
                  style={{
                    color:
                      product.status.name === "Cancelled" ? "maroon" : "black"
                  }}
                >
                  {product.name}
                </Text>
                <Text
                  note
                  style={{
                    color:
                      product.status.name === "Cancelled" ? "maroon" : "black"
                  }}
                >
                  {product.status.name}
                </Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            {product.pic ? (
              <Image
                source={{ uri: product.pic }}
                style={{ height: 200, flex: 1 }}
              />
            ) : (
              <Image
                source={{
                  uri:
                    "https://www.2checkout.com/upload/images/graphic_product_tangible.png"
                }}
                style={{ height: 200, flex: 1 }}
              />
            )}
          </CardItem>
          <Text style={{ fontWeight: "bold" }}>
            {"  "}
            Product Description:
          </Text>
          <CardItem>
            <Text>{product.description}</Text>
          </CardItem>
          <Text style={{ fontWeight: "bold" }}>
            {"  "}
            Product Category:
          </Text>
          <CardItem>
            <Text>{product.type.name}</Text>
          </CardItem>
          <Text style={{ fontWeight: "bold" }}>
            {"  "}
            Product Price:
          </Text>
          <CardItem>
            <Text>{product.price} K.D.</Text>
          </CardItem>
          <Text style={{ fontWeight: "bold" }}>
            {"  "}
            Contact Number:
          </Text>
          <CardItem>
            {product.created_by.profile && product.created_by.profile.mobile ? (
              <Text>{product.created_by.profile.mobile}</Text>
            ) : null}
          </CardItem>
          <Text style={{ fontWeight: "bold" }}>
            {"  "}
            Product Tags:
          </Text>
          <CardItem>
            <ScrollView horizontal>{existingTags}</ScrollView>
          </CardItem>
          <Text style={{ fontWeight: "bold" }}>
            {"  "}
            Quantity Remaining in Stock:
          </Text>
          <CardItem>
            <Text>{product.quantity}</Text>
          </CardItem>
        </Card>
        {(product.quantity > 0) & (product.status.name !== "Cancelled") ? (
          <Button
            success={authStore.isAuthenticated}
            light={!authStore.isAuthenticated}
            full
            onPress={() => {
              if (authStore.isAuthenticated) {
                ProductStore.removeQuantityFromProduct(product.id);
                CartStore.addCart(product, 1);
                console.log(CartStore.items);
                Toast.show({
                  text: `Added ${product.name} to Cart`,
                  type: "success",
                  duration: 500,
                  position: "top"
                });
              } else {
                alert("Please Login to Add Items to Cart");
              }
            }}
          >
            <Text>
              {authStore.isAuthenticated
                ? "Add to Cart"
                : "Login To Add To Cart"}
            </Text>
          </Button>
        ) : (
          <Button light full>
            <Text>No more stock available</Text>
          </Button>
        )}
        <Text> </Text>
      </Content>
    );
  }
}

export default observer(ProductDetail);
