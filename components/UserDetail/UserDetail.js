import React, { Component } from "react";
import { Image } from "react-native";
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
  componentDidMount() {
    console.log(this.props.match.params.productID);
  }

  render() {
    const user = UserStore.users[this.props.match.params.userID];
    let userProds;
    if (user.products.length > 0) {
      userProds = user.products.map((product, index) => {
        <SwipeRow
          key={index}
          leftOpenValue={75}
          rightOpenValue={-75}
          left={
            <Button
              success
              onPress={() => alert(`Added ${product.name} to Cart`)}
            >
              <Icon active name="add" />
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
                <Text> {product.name}</Text>
                <Text
                  note
                  style={{
                    color: product.status.name === "Cancelled" && "grey"
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
        />;
      });
    }

    return (
      <Content>
        <Card style={{ width: "95%", alignSelf: "center" }}>
          <CardItem>
            <Left>
              <Body>
                <Text>{user.username}</Text>
                <Text note>
                  {user.first_name}
                  {user.last_name}
                </Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody />
        </Card>
        {userProds}
      </Content>
    );
  }
}

export default observer(UserDetail);
