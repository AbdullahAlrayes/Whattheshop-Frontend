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
import UpdateProductStore from "../Store/UpdateProductStore";
import { observer } from "mobx-react";

class TagList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: ""
    };
  }
  componentDidMount() {
    ProductStore.tagSearch("");
  }

  render() {
    let existingTags;
    let indexVal;
    if (ProductStore.tags.length > 0) {
      existingTags = ProductStore.filteredTags.map((tag, index) => {
        indexVal = UpdateProductStore.tag.findIndex(
          selectedTag => selectedTag.toLowerCase() === tag.name.toLowerCase()
        );

        if (indexVal < 0) {
          return (
            <ListItem key={index} itemDivider>
              <Button
                transparent
                onPress={() => {
                  UpdateProductStore.addTag(tag.name);

                  console.log(tag.name);
                  this.props.history.goBack();
                }}
              >
                <Text>{tag.name}</Text>
              </Button>
            </ListItem>
          );
        }
      });
    }

    return (
      <Content>
        <Item rounded>
          <Icon name="ios-search" />
          <Input
            placeholder="Search"
            onChangeText={inputVal => {
              this.setState({ searchResult: inputVal });
              ProductStore.tagSearch(inputVal);
            }}
          />
        </Item>
        {ProductStore.tagQuery !== "" && (
          <Button
            full
            success
            onPress={() => {
              ProductStore.addTag(ProductStore.tagQuery);
              UpdateProductStore.addTag(ProductStore.tagQuery);
              this.props.history.goBack();
            }}
          >
            <Text>Create a New Tag {ProductStore.tagQuery}</Text>
          </Button>
        )}

        <List>{existingTags}</List>
      </Content>
    );
  }
}

export default observer(TagList);
