import React, { Component } from "react";
import { observer } from "mobx-react";
import { NativeRouter, Route, Link, Switch } from "react-router-native";

import { ListView } from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Input,
  Thumbnail,
  Icon,
  Row,
  SwipeRow,
  View,
  Segment,
  Left,
  Right,
  Body,
  List,
  ListItem,
  Text
} from "native-base";

//Import Product Store
import ProductStore from "../Store/ProductStore";
import UserStore from "../Store/UserStore";

class UsersList extends Component {
  constructor(props) {
    super(props);
    0;
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: ProductStore.filteredProducts
    };
  }
  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    let userList;
    if (UserStore.users.length > 0 && UserStore.filteredUsers.length === 0) {
      userList = <Text>No Search Results...</Text>;
    } else if (UserStore.filteredUsers.length > 0) {
      userList = UserStore.filteredUsers.map((user, index) => (
        <Row key={index} style={{ minHeight: 60 }}>
          <Link component={Button} to={"/user/" + index} transparent>
            {!user.profile && (
              <Thumbnail
                source={{
                  uri:
                    "http://profilepicturesdp.com/wp-content/uploads/2018/07/empty-user-profile-picture-3-200x200.jpg"
                }}
              />
            )}
            {user.profile &&
              !user.profile.pic && (
                <Thumbnail
                  source={{
                    uri:
                      "http://profilepicturesdp.com/wp-content/uploads/2018/07/empty-user-profile-picture-3-200x200.jpg"
                  }}
                />
              )}
            {user.profile &&
              user.profile.pic && (
                <Thumbnail source={{ uri: user.profile.pic }} />
              )}

            <View>
              <Text style={{ color: "black" }}> {user.username}</Text>
              <Text note>
                {" "}
                {user.first_name} {user.last_name}
              </Text>
            </View>
            <View>
              <Text style={{ color: "black" }} />
            </View>
          </Link>
        </Row>
      ));
    } else {
      userList = <Text>Loading Users...</Text>;
    }

    return <View>{userList}</View>;
  }
}

export default observer(UsersList);
