import React, { Component } from "react";

// NativeBase
import { Footer, FooterTab, Button, Icon, Text } from "native-base";
import { LinearGradient } from "expo";

// Router
import { Link } from "react-router-native";

class MyFooter extends Component {
  render() {
    return (
      <Footer>
        <FooterTab>
          <LinearGradient
            colors={["#bdc3c7", "#2c3e50"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: "300%"
            }}
          />
          <Link component={Button} verticle to="/addProduct">
            <Icon type="Entypo" name="plus" style={{ color: "white" }} />
            <Text style={{ color: "white" }}>Add Item</Text>
          </Link>
          <Link component={Button} verticle to="/productList">
            <Icon name="home" type="Entypo" style={{ color: "white" }} />
            <Text style={{ color: "white" }}>My Items</Text>
          </Link>
          <Link component={Button} verticle to="/profile">
            <Icon name="list" type="Feather" style={{ color: "white" }} />
            <Text style={{ color: "white" }}>Orders</Text>
          </Link>
          <Link component={Button} verticle to="/testpage">
            <Icon name="person" style={{ color: "white" }} />
            <Text style={{ color: "white" }}>Test</Text>
          </Link>
        </FooterTab>
      </Footer>
    );
  }
}

export default MyFooter;
