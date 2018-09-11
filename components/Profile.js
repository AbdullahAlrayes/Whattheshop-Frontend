import React, { Component } from "react";
import { observer } from "mobx-react";
import { Image } from "react-native";

// NativeBase Components
import {
  Card,
  CardItem,
  Text,
  Button,
  Container,
  Header,
  Content,
  Form,
  View,
  Thumbnail,
  Left,
  Icon,
  Right,
  SwipeRow,
  Body,
  Item,
  Input,
  Label
} from "native-base";
import authStore from "./Store/authStore";
import UserStore from "./Store/UserStore";
import ProductStore from "./Store/ProductStore";
import {
  Redirect,
  NativeRouter,
  Route,
  Link,
  Switch
} from "react-router-native";
import { ScrollView } from "react-native-gesture-handler";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: false,
      redirect: false,
      first_name:
        UserStore.users[
          UserStore.users.findIndex(user => user.id === authStore.user.user_id)
        ].first_name,
      last_name:
        UserStore.users[
          UserStore.users.findIndex(user => user.id === authStore.user.user_id)
        ].last_name,
      email:
        UserStore.users[
          UserStore.users.findIndex(user => user.id === authStore.user.user_id)
        ].email
    };
  }
  render() {
    if (!authStore.isAuthenticated) {
      return <Redirect to="/login" />;
    }
    let userID = authStore.user.user_id;
    let userStoreIndex = UserStore.users.findIndex(user => user.id === userID);
    let currentUser = UserStore.users[userStoreIndex];
    let outputProductView;
    ProductStore.selectedUser = currentUser.id;

    let productList;
    if (ProductStore.filteredProductsByUser.length > 0) {
      productList = ProductStore.filteredProductsByUser.map(
        (product, index) => (
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
              (product.quantity > 0) &
                (product.status.name !== "Cancelled") && (
                <Button
                  danger
                  onPress={() => {
                    alert("Delete Item Here");
                  }}
                >
                  <Icon name="trash" />
                </Button>
              )
            }
            body={
              <Link
                component={Button}
                to={
                  "/product/" +
                  ProductStore.products.findIndex(
                    prod => product.id === prod.id
                  )
                }
                transparent
              >
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
                  <Text
                    style={{
                      fontWeight: "bold",
                      color: product.quantity < 4 ? "red" : "black"
                    }}
                  >
                    {product.quantity} remaining
                  </Text>
                )}
              </Link>
            }
            right={
              <Link
                component={Button}
                to={
                  "/product/" +
                  ProductStore.products.findIndex(
                    prod => product.id === prod.id
                  )
                }
                warning
              >
                <Icon active name="list" />
                <Text>Edit</Text>
              </Link>
            }
          />
        )
      );
    } else if (ProductStore.products.length > 0) {
      productList = <Text>No Products Available...</Text>;
    } else {
      productList = <Text>Loading Products...</Text>;
    }

    return (
      <View>
        <Button
          full
          warning={this.state.update === false}
          success={this.state.update === true}
          onPress={() => {
            if (this.state.update === true) {
              if (
                this.state.first_name === "" ||
                this.state.last_name === "" ||
                this.state.email === ""
              ) {
                alert("Please update all fields below");
              } else {
                UserStore.updateUserDetails(
                  UserStore.users[
                    UserStore.users.findIndex(
                      user => user.id === authStore.user.user_id
                    )
                  ].username,
                  this.state.first_name,
                  this.state.last_name,
                  this.state.email,
                  authStore.user.user_id
                );
                this.setState({ update: !this.state.update });
              }
            } else {
              this.setState({ update: !this.state.update });
            }
          }}
        >
          <Text>
            {this.state.update
              ? "Submit User Information"
              : "Update User Information"}
          </Text>
        </Button>
        <Card>
          <Form>
            <Item floatingLabel>
              <Label>First Name:</Label>
              <Input
                disabled={!this.state.update}
                value={currentUser.first_name}
                onChangeText={value => {
                  this.setState({ first_name: value });
                }}
              />
            </Item>
            <Item floatingLabel>
              <Label>Last Name:</Label>
              <Input
                disabled={!this.state.update}
                value={currentUser.last_name}
                onChangeText={value => {
                  this.setState({ last_name: value });
                }}
              />
            </Item>
            <Item floatingLabel>
              <Label>Email Address:</Label>
              <Input
                disabled={!this.state.update}
                value={currentUser.email}
                onChangeText={value => {
                  this.setState({ email: value });
                }}
              />
            </Item>
          </Form>

          <CardItem />
        </Card>
        {this.state.update === true && (
          <Button full danger onPress={() => this.setState({ redirect: true })}>
            <Text>Cancel Profile Changes</Text>
          </Button>
        )}
        <Button full transparent>
          <Text />
        </Button>

        {productList}
        <Link to={"/addProduct"} component={Button} full success>
          <Text>Add Products</Text>
        </Link>
        <Button full danger onPress={() => authStore.logoutUser()}>
          <Text>Logout</Text>
        </Button>
      </View>
    );
  }
}
export default observer(Profile);
