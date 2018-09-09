import { decorate, observable, action, computed } from "mobx";
import axios from "axios";
import { AsyncStorage } from "react-native";
import jwt_decode from "jwt-decode";

// Utils
import setAuthToken from "../../utils/setAuthToken";

// Stores
import UserStore from "./UserStore";
import OrderSNStore from "./OrderSNStore";

const instance = axios.create({
  baseURL: "http://178.128.202.231"
});

class authStore {
  constructor() {
    this.user = null;
  }

  get isAuthenticated() {
    return !!this.user;
  }

  setCurrentUser(decoded) {
    this.user = decoded;
    UserStore.signedInUser = decoded;
    OrderSNStore.userID = UserStore.users.findIndex(
      user => user.id === UserStore.signedInUser
    );
  }

  logoutUser() {
    console.log("logging out");
    console.log(this.user);
    AsyncStorage.removeItem("jwtToken").then(
      () => {
        this.user = null;
        setAuthToken();
      },
      () => {
        console.log("something went wrong with logging out");
      }
    );
  }

  loginUser(username, password) {
    const userData = {
      username: username,
      password: password
    };
    instance
      .post("/api/login/", userData)
      .then(res => res.data)
      .then(user => {
        const { token } = user;
        // Save token to localStorage
        AsyncStorage.setItem("jwtToken", token).then(
          () => {
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            this.setCurrentUser(decoded);
          },
          () => console.log("something went wrong with setting jwt token")
        );
      })
      .then(() => console.log("success"))
      .catch(err =>
        alert(
          "Incorrect Account, try again or register if you do not have an account."
        )
      );
  }
  registerUser(username, password) {
    const userData = {
      username: username,
      password: password
    };
    instance
      .post("/api/register/", userData)
      .then(res => res.data)
      .then(user => {
        const { token } = user;
        // Save token to localStorage
        AsyncStorage.setItem("jwtToken", token).then(
          () => {
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            this.setCurrentUser(decoded);
          },
          () => console.log("something went wrong with setting jwt token")
        );
      })
      .then(() => console.log("success"))
      .then(() => this.loginUser(username, password))
      .catch(err =>
        alert(
          "Incorrect Account, try again or register if you do not have an account."
        )
      );
  }

  checkForToken = () => {
    AsyncStorage.getItem("jwtToken")
      .then(token => {
        if (token !== null) {
          const currentTime = Date.now() / 1000;

          // Decode token and get user info
          const decoded = jwt_decode(token);

          // Check token expiration
          if (decoded.exp >= currentTime) {
            // Set auth token header
            setAuthToken(token);
            // Set user and isAuthenticated
            this.setCurrentUser(decoded);
          } else {
            this.logoutUser();
            // Redirect to login
          }
        }
      })
      .catch(err => console.error(err));
  };
}

decorate(authStore, {
  user: observable,
  isAuthenticated: computed
});

export default new authStore();
