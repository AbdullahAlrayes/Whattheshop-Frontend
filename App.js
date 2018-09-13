import React, { Component } from "react";
import Expo, { AppLoading } from "expo";
import {
  I18nManager,
  Animated,
  StyleSheet,
  Image,
  Text,
  View
} from "react-native";
import { AsyncStorage } from "react-native";

// Component
import MainContent from "./components/MainContent";
import MainHeader from "./components/MainHeader";
import MainFooter from "./components/MainFooter";
import MyHeader from "./components/Header/Header";
import MyFooter from "./components/Footer/Footer";

// NativeBase
import { Root, Container, Content, Button } from "native-base";

// Store
import authStore from "./stores/authStore";
import Logo from "./components/SplashScreen/Logo.png";

// Routing
import { NativeRouter } from "react-router-native";

I18nManager.forceRTL(false);

class App extends Component {
  constructor() {
    super();
    this.fadeAnimation = new Animated.Value(0);
    this.state = {
      fontsReady: false,
      ready: true,
      moveOn: false
    };
  }

  componentDidMount() {
    this.loadFonts();
    authStore.checkForToken();
    Animated.timing(this.fadeAnimation, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true
    }).start();
  }

  loadFonts() {
    Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    })
      .then(() => this.setState({ fontsReady: true }))
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.fontsReady) {
      return <AppLoading />;
    } else if (this.state.moveOn === false) {
      return (
        <Container
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black"
          }}
        >
          <Animated.View
            style={{
              opacity: this.fadeAnimation
            }}
          >
            <Animated.Image
              style={[{ height: 400 }, { width: 400 }]}
              source={Logo}
            />
            <Button full dark onPress={() => this.setState({ moveOn: true })}>
              <Text
                style={{ color: "white", fontSize: 30, fontStyle: "italic" }}
              >
                Start Browsing
              </Text>
            </Button>
          </Animated.View>
        </Container>
      );
    }
    return (
      <Root>
        <NativeRouter>
          <Container>
            <MyHeader />
            <MainContent />
            <MyFooter />
          </Container>
        </NativeRouter>
      </Root>
    );
  }
}

export default App;
