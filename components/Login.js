import React, { Component } from "react";
import { observer } from "mobx-react";

// NativeBase Components
import {
  Form,
  Item,
  Input,
  Button,
  Text,
  CheckBox,
  Icon,
  ListItem,
  Body
} from "native-base";

// Store
import authStore from "./Store/authStore";

// Routing
import { Redirect } from "react-router-native";

import { NativeRouter, Route, Link, Switch } from "react-router-native";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      rememberSignIn: false
    };
  }
  componentDidMount() {
    authStore.checkForToken();
  }

  render() {
    if (authStore.isAuthenticated) return <Redirect to="/profile" />;
    return (
      <Form>
        <Text> </Text>
        <Text />
        <Button full disabled light>
          <Text style={{ color: "black" }}>Write in Your Details Below::</Text>
        </Button>
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
        <ListItem>
          <CheckBox
            checked={this.state.rememberSignIn}
            color="green"
            onPress={() =>
              this.setState({ rememberSignIn: !this.state.rememberSignIn })
            }
          />
          <Body>
            <Text>Keep Me Signed In</Text>
          </Body>
        </ListItem>
        <Button
          success
          full
          onPress={() =>
            authStore.loginUser(
              this.state.username,
              this.state.password,
              this.state.rememberSignIn
            )
          }
        >
          <Text style={{ fontWeight: "bold" }}>Login</Text>
        </Button>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>

        <Link component={Button} to="/register" primary full>
          <Text style={{ fontWeight: "bold" }}>Create a New Account</Text>
        </Link>
      </Form>
    );
  }
}
export default observer(Login);
