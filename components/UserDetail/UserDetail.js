import React, { Component } from "react";
import { Image, ScrollView } from "react-native";
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
  Icon,
  Left,
  SwipeRow,
  Body,
  Right
} from "native-base";
import { ListView } from "react-native";

//Store
import ProductStore from "../Store/ProductStore";
import { observer } from "mobx-react";
import UserStore from "../Store/UserStore";
import CartStore from "../Store/CartStore";

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      user: {},
      basic: true,
      listViewData: ProductStore.filteredProducts
    };
  }

  render() {
    const userIDparam = this.props.match.params.userID;
    const user = UserStore.users[userIDparam];
    let outputProductView;
    ProductStore.selectedUser = user.id;
    if (ProductStore.filteredProductsByUser.length > 0) {
      outputProductView = ProductStore.filteredProductsByUser.map(
        (product, index) => {
          return (
            <Card key={index} style={{ width: "95%", alignSelf: "center" }}>
              <CardItem>
                <Left>
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
              <Text style={{ fontWeight: "bold" }}>
                {"  "}
                Quantity Remaining in Stock:
              </Text>
              <CardItem>
                <Text>{product.quantity}</Text>
              </CardItem>
              {(product.quantity > 0) &
              (product.status.name !== "Cancelled") ? (
                <Button
                  success
                  full
                  onPress={() => {
                    ProductStore.removeQuantityFromProduct(product.id);
                    CartStore.addCart(product, 1);
                    console.log(CartStore.items);
                    alert(`Added ${product.name} to Cart`);
                  }}
                >
                  <Text>Add to Cart</Text>
                </Button>
              ) : (
                <Button light full>
                  <Text>No more stock available</Text>
                </Button>
              )}
            </Card>
          );
        }
      );
    } else {
      outputProductView = (
        <Button style={{ backgroundColor: "#7575a3" }} full>
          <Text> No Products Available</Text>
        </Button>
      );
    }
    return (
      <View>
        <View>
          <Card style={{ width: "95%", alignSelf: "center" }}>
            <CardItem>
              <Left>
                {!user.profile && (
                  <Thumbnail
                    source={{
                      uri:
                        "http://profilepicturesdp.com/wp-content/uploads/2018/07/empty-user-profile-picture-3-200x200.jpg"
                    }}
                  />
                )}
                {user.profile &&
                  !user.profile.pic && (
                    <Thumbnail
                      source={{
                        uri:
                          "http://profilepicturesdp.com/wp-content/uploads/2018/07/empty-user-profile-picture-3-200x200.jpg"
                      }}
                    />
                  )}
                {user.profile &&
                  user.profile.pic && (
                    <Thumbnail source={{ uri: user.profile.pic }} />
                  )}
                <Body>
                  <Text>{user.username}</Text>
                  <Text note>
                    {user.first_name}
                    {user.last_name}
                  </Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
        </View>
        <ScrollView>
          {outputProductView}
          <Text> </Text>
          <Text> </Text>
          <Text> </Text>
          <Text> </Text>
          <Text> </Text>
          <Text> </Text>
        </ScrollView>
      </View>
    );
  }
}

export default observer(UserDetail);
