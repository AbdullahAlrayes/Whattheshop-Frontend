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
import { withRouter } from "react-router-native";

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
          <Button transparent>
            <Icon name="cart" />
          </Button>
        </Right>
      </Header>
    );
  }
}

export default withRouter(MyHeader);
