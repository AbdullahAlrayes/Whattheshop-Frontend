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
  Right
} from "native-base";
import { NativeRouter, Route, Link, Switch } from "react-router-native";

//Store
import ProductStore from "../Store/ProductStore";
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
    return (
      <Content>
        <Card style={{ width: "95%", alignSelf: "center" }}>
          <CardItem>
            <Left>
              <Link to={"/user/" + product.created_by}>
                <Thumbnail source={{ uri: product.created_by.profile.pic }} />
              </Link>
              <Body>
                <Text>{product.name}</Text>
                <Text note>{product.status.name}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            {product.pic && (
              <Image
                source={{ uri: product.pic }}
                style={{ height: 200, width: null, flex: 1 }}
              />
            )}
            {!product.pic && (
              <Image
                source={{
                  uri:
                    "https://www.2checkout.com/upload/images/graphic_product_tangible.png"
                }}
                style={{ height: 200, width: null, flex: 1 }}
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
            <Text>{product.created_by.profile.mobile}</Text>
          </CardItem>
        </Card>
      </Content>
    );
  }
}

export default observer(ProductDetail);
