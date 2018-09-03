import React, { Component } from "react";
import { observer } from "mobx-react";

import { ListView } from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Thumbnail,
  SwipeRow,
  View,
  List,
  ListItem,
  Text
} from "native-base";

//Import Product Store
import ProductStore from "../Store/ProductStore";

class singleProduct extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      clicked: false
    };
  }

  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    return (
      <SwipeRow
        leftOpenValue={50}
        rightOpenValue={-50}
        left={
          <Button
            success
            onPress={() => alert(`Added ${product.name} to Cart`)}
          >
            <Icon active name="add" />
          </Button>
        }
        body={
          <Button
            transparent
            onPress={() => this.setState({ clicked: !this.state.clicked })}
          >
            <Thumbnail large source={{ uri: product.pic }} />
            <Text style={{ alignSelf: "center", color: "black" }}>
              {product.name}
            </Text>
          </Button>
        }
        right={
          <Button
            warning
            onPress={() => alert(`Take you to ${product.name} Details`)}
          >
            <Icon active name="list" />
          </Button>
        }
      />
    );
  }
}

export default observer(singleProduct);
