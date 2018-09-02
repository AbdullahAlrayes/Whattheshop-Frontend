import React, { Component } from "react";
import { Icon } from "native-base";
import { Text, View } from "native-base";

class Lol extends Component {
  render() {
    return (
      <View>
        <Icon
          type="Octicons"
          name="home"
          style={{
            fontSize: 300,
            alignSelf: "center",
            paddingTop: "50%",
            color: "red"
          }}
        />
        <Text style={{ alignSelf: "center" }}>Welcome to the Every Shop</Text>
      </View>
    );
  }
}

export default Lol;
