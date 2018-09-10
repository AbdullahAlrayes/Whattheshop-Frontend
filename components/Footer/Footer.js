import React, { Component } from "react";

// NativeBase
import { Footer, FooterTab, Button, Icon, Text } from "native-base";
import { LinearGradient } from "expo";
import { observer } from "mobx-react";

// Router
import { Link } from "react-router-native";
import authStore from "../Store/authStore";
import UserStore from "../Store/UserStore";

class MyFooter extends Component {
  render() {
    return (
      <Footer>
        <FooterTab>
          <LinearGradient
            colors={["#2c3e50", "#bdc3c7"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: "300%"
            }}
          />

          <Link component={Button} verticle to="/productLists">
            <Icon name="home" type="Entypo" style={{ color: "white" }} />
            <Text style={{ color: "white" }}>Main Store</Text>
          </Link>
          <Link
            component={Button}
            verticle
            to="/orders"
            onPress={() => {
              if (!authStore.isAuthenticated) {
                alert("Please Login to View Order History");
              }
            }}
          >
            <Icon name="list" type="Feather" style={{ color: "white" }} />
            <Text style={{ color: "white" }}>Order History</Text>
          </Link>
          <Link component={Button} verticle to="/login">
            <Icon name="person" style={{ color: "white" }} />
            <Text style={{ color: "white" }}>
              {authStore.isAuthenticated ? "Profile" : "Login"}
            </Text>
          </Link>
        </FooterTab>
      </Footer>
    );
  }
}

export default observer(MyFooter);
