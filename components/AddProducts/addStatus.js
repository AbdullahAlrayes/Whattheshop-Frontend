import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Button,
  ListItem,
  Input,
  Text,
  View,
  List,
  Item,
  Picker,
  Icon
} from "native-base";
import ProductStore from "../Store/ProductStore";
import newProduct from "../Store/AddProduct";
import { observer } from "mobx-react";

class StatusList extends Component {
  render() {
    let existingTags;
    if (ProductStore.status.length > 0) {
      existingTags = ProductStore.status.map((status, index) => (
        <Picker.Item label={status.name} value={status.name} />
      ));
    }

    return (
      <Item picker>
        <Text style={{ fontWeight: "bold" }}>Product Status:</Text>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="ios-arrow-down-outline" />}
          style={{ width: undefined }}
          placeholder="Select a type"
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          selectedValue={newProduct.status}
          onValueChange={inputVal => newProduct.statusChange(inputVal)}
        >
          {existingTags}
        </Picker>
      </Item>
    );
  }
}
export default observer(StatusList);
