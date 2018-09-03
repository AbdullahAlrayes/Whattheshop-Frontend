import React, { Component } from "react";
import { observer } from "mobx-react";
import { NativeRouter, Route, Link, Switch } from "react-router-native";

import { ListView } from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Thumbnail,
  Icon,
  SwipeRow,
  View,
  List,
  ListItem,
  Text
} from "native-base";

//Import Product Store
import ProductStore from "../Store/ProductStore";

class ProductListView extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: ProductStore.products
    };
  }
  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    let productList;
    if (ProductStore.products.length > 0) {
      productList = ProductStore.products.map((product, index) => (
        <SwipeRow
          key={index}
          leftOpenValue={75}
          rightOpenValue={-75}
          left={
            <Button
              success
              onPress={() => alert(`Added ${product.name} to Cart`)}
            >
              <Icon active name="add" />
            </Button>
          }
          body={
            <Link component={Button} to={"/product/" + index} transparent>
              <Thumbnail source={{ uri: product.pic }} />
              <Text style={{ alignSelf: "center", color: "black" }}>
                {product.name}
              </Text>
            </Link>
          }
          right={
            <Link component={Button} to={"/product/" + index} warning>
              <Icon active name="list" />
            </Link>
          }
        />
      ));
    } else {
      productList = <Text>Loading Products...</Text>;
    }

    return (
      <Content style={{ width: "90%", alignSelf: "center" }}>
        {productList}
      </Content>
    );
  }
}

export default observer(ProductListView);
