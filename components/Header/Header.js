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

class MyHeader extends Component {
  render() {
    return (
      <Header>
        <Left>
          <Button transparent>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Every Shop</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="cart" />
          </Button>
        </Right>
      </Header>
    );
  }
}

export default MyHeader;
