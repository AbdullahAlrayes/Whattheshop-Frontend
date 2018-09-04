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

class TypeList extends Component {
  render() {
    let existingTags;
    if (ProductStore.types.length > 0) {
      existingTags = ProductStore.types.map((type, index) => (
        <Picker.Item key={index} label={type.name} value={type.name} />
      ));
    }

    return (
      <Item picker>
        <Text style={{ fontWeight: "bold" }}>Type:</Text>
        <Picker
          mode="dropdown"
          iosIcon={<Icon name="ios-arrow-down-outline" />}
          style={{ width: undefined }}
          placeholder="Select a type"
          placeholderStyle={{ color: "#bfc6ea" }}
          placeholderIconColor="#007aff"
          selectedValue={newProduct.type}
          onValueChange={inputVal => newProduct.typeChange(inputVal)}
        >
          {existingTags}
        </Picker>
      </Item>
    );
  }
}
export default observer(TypeList);
