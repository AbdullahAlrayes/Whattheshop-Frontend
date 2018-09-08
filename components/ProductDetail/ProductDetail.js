import React, { Component } from "react";
import { Image } from "react-native";
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
  Right,
  Toast,
  Badge
} from "native-base";
import { NativeRouter, Route, Link, Switch } from "react-router-native";

//Store
import ProductStore from "../Store/ProductStore";
import CartStore from "../Store/CartStore";
import UserStore from "../Store/UserStore";
import { observer } from "mobx-react";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
  }
  componentDidMount() {
    console.log(this.props.match.params.productID);
  }

  render() {
    const product = ProductStore.products[this.props.match.params.productID];
    const userIndex = UserStore.users.findIndex(
      user => user.id === product.created_by.id
    );
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
          <CardItem>
            <Left>
              <Link to={"/user/" + userIndex}>
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
              </Link>
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
          <CardItem>{existingTags}</CardItem>
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
            success
            full
            onPress={() => {
              ProductStore.removeQuantityFromProduct(product.id);
              CartStore.addCart(product, 1);
              console.log(CartStore.items);
              Toast.show({
                text: `Added ${product.name} to Cart`,
                type: "success",
                duration: 500,
                position: "top"
              });
            }}
          >
            <Text>Add to Cart</Text>
          </Button>
        ) : (
          <Button light full>
            <Text>No more stock available</Text>
          </Button>
        )}
      </Content>
    );
  }
}

export default observer(ProductDetail);
