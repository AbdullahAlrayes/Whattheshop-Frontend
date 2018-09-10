import React, { Component } from "react";
import { observer } from "mobx-react";

// NativeBase Components
import { Form, Item, Input, Button, Text, Icon } from "native-base";

// Store
import authStore from "./Store/authStore";

// Routing
import { Redirect } from "react-router-native";

import { NativeRouter, Route, Link, Switch } from "react-router-native";

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  render() {
    if (authStore.isAuthenticated) return <Redirect to="/profile" />;
    return (
      <Form>
        <Text> </Text>
        <Text> Sign up by filling out the details below:</Text>

        <Text> </Text>

        <Item>
          <Input
            placeholder="Username"
            autoCapitalize="none"
            onChangeText={username => this.setState({ username: username })}
          />
        </Item>
        <Item last>
          <Input
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={password => this.setState({ password: password })}
          />
        </Item>
        <Button
          success
          full
          onPress={() =>
            authStore.registerUser(this.state.username, this.state.password)
          }
        >
          <Text style={{ fontWeight: "bold" }}>Create an Account</Text>
        </Button>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
      </Form>
    );
  }
}
export default observer(RegisterPage);
