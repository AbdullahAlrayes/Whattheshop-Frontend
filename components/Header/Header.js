import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Item,
  Icon,
  Input,
  Title
} from "native-base";
import { withRouter, Link } from "react-router-native";

class MyHeader extends Component {
  render() {
    return (
      <Header>
        <Left>
          <Button onPress={() => this.props.history.goBack()} transparent>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Every Shop</Title>
        </Body>
        <Right>
          <Link component={Button} transparent to="/cart">
            <Icon name="cart" />
          </Link>
        </Right>
      </Header>
    );
  }
}

export default withRouter(MyHeader);
