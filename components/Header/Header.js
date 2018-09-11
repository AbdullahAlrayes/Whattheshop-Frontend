import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Text,
  Button,
  Item,
  Icon,
  Input,
  Title
} from "native-base";
import { Platform, StatusBar, Image } from "react-native";
import { LinearGradient } from "expo";
import logoHeader from "./logoHeader.png";

import { withRouter, Link } from "react-router-native";

class MyHeader extends Component {
  render() {
    return (
      <Header style={{}}>
        {Platform.OS !== "ios" && <StatusBar hidden={true} />}
        <LinearGradient
          colors={["#000000", "#000000"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "300%"
          }}
        />
        <Left>
          <Button onPress={() => this.props.history.goBack()} transparent>
            <Icon name="arrow-back" active style={{ color: "white" }} />
          </Button>
          <Text> </Text>
        </Left>
        <Body>
          <Image source={logoHeader} style={{ width: 200, height: 40 }} />
        </Body>
        <Right>
          <Link component={Button} transparent to="/cart">
            <Icon name="cart" active style={{ color: "white" }} />
          </Link>
        </Right>
      </Header>
    );
  }
}

export default withRouter(MyHeader);
