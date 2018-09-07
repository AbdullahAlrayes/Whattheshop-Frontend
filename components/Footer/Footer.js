import React, { Component } from "react";

// NativeBase
import { Footer, FooterTab, Button, Icon, Text } from "native-base";

// Router
import { Link } from "react-router-native";

class MyFooter extends Component {
  render() {
    return (
      <Footer>
        <FooterTab>
          <Link component={Button} verticle to="/addProduct">
            <Icon type="Entypo" name="plus" />
            <Text>Add Item</Text>
          </Link>
          <Link component={Button} verticle to="/productList">
            <Icon name="home" type="Entypo" />
            <Text>My Items</Text>
          </Link>
          <Link component={Button} verticle to="/profile">
            <Icon name="list" type="Feather" />
            <Text>Orders</Text>
          </Link>
          <Link component={Button} verticle to="/testpage">
            <Icon name="person" />
            <Text>Test</Text>
          </Link>
        </FooterTab>
      </Footer>
    );
  }
}

export default MyFooter;
