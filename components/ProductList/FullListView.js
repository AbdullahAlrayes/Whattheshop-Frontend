import React, { Component } from "react";
import { observer } from "mobx-react";
import { NativeRouter, Route, Link, Switch } from "react-router-native";

import { ListView, ScrollView } from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Input,
  Grid,
  Item,
  Col,
  Thumbnail,
  Picker,
  Form,
  Icon,
  SwipeRow,
  Segment,
  View,
  Left,
  Right,
  Body,
  List,
  ListItem,
  Text,
  Badge
} from "native-base";

//Import Product Store
import ProductStore from "../Store/ProductStore";
import UserStore from "../Store/UserStore";
import UsersList from "./UsersList";
import ProductListView from "./ProductListView";

class FullListView extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      sortList: "product",
      selected2: undefined
    };
  }
  onValueChange2(value: string) {
    ProductStore.typeFilter = value;
    this.setState({
      selected2: value
    });
  }
  render() {
    let picker;

    {
      ProductStore.loading &&
        (picker = ProductStore.types.map((type, index) => (
          <Picker.Item key={index} label={type.name} value={type.name} />
        )));
    }

    return (
      <View>
        <View>
          <Item rounded>
            <Icon name="ios-search" />
            <Input
              placeholder="Search"
              onChangeText={inputVal => {
                ProductStore.productSearch(inputVal);
                UserStore.userSearch(inputVal);
              }}
            />
          </Item>

          <Segment style={{ backgroundColor: "#2c3e50" }}>
            <Button
              first
              active={this.state.sortList === "product"}
              onPress={() => this.setState({ sortList: "product" })}
            >
              <Text>By Product</Text>
            </Button>
            <Button
              active={this.state.sortList === "user"}
              onPress={() => this.setState({ sortList: "user" })}
              last
            >
              <Text>By User</Text>
            </Button>
          </Segment>
          {this.state.sortList === "product" && (
            <Form>
              <Item picker>
                <Text style={{ fontWeight: "bold" }}>Filter by Category: </Text>
                {this.state.selected2 && (
                  <Button transparent onPress={() => this.onValueChange2(null)}>
                    <Badge small>
                      <Text>-</Text>
                    </Badge>
                  </Button>
                )}
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  style={{ width: undefined }}
                  placeholder="Select a Category"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selected2}
                  onValueChange={this.onValueChange2.bind(this)}
                >
                  {picker}
                </Picker>
              </Item>
            </Form>
          )}
        </View>
        <ScrollView style={{ minHeight: 90 }}>
          <Text> </Text>
          {this.state.sortList === "product" && <ProductListView />}
          {this.state.sortList === "user" && <UsersList />}
        </ScrollView>
      </View>
    );
  }
}

export default observer(FullListView);
