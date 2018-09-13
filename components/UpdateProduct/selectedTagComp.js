import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Button,
  ListItem,
  Badge,
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
import { NativeRouter, Route, Link, Switch } from "react-router-native";
import UpdateProductStore from "../Store/UpdateProductStore";

class SelectedTags extends Component {
  render() {
    let existingTags;
    if (UpdateProductStore.tag.length > 0) {
      existingTags = UpdateProductStore.tag.map((tag, index) => (
        <Button
          key={index}
          transparent
          onPress={() => UpdateProductStore.removeTag(index)}
        >
          <Badge style={{ backgroundColor: "grey", flexDirection: "row" }}>
            <Text>{tag}</Text>
            <Icon style={{ fontSize: 20 }} name="x" type="Octicons" />
          </Badge>
        </Button>
      ));
    }

    return (
      <View>
        <Item>
          <Text style={{ fontWeight: "bold" }}>Add Tags:</Text>
          <Link
            component={Button}
            small
            transparent
            to={"/addTag2/" + UpdateProductStore.tagCounter}
          >
            <Icon small name="plus" type="Entypo" />
          </Link>
        </Item>
        <Item style={{ flexWrap: "wrap", justifyContent: "flex-start" }}>
          {existingTags}
        </Item>
      </View>
    );
  }
}
export default observer(SelectedTags);
