import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Text,
  Item,
  Radio,
  Button,
  Body,
  ListItem,
  Left,
  SwipeRow,
  List,
  ActionSheet,
  Icon,
  Right,
  Picker,
  Input,
  Textarea,
  View
} from "native-base";
import { Image } from "react-native";
import { observer } from "mobx-react";
import { NativeRouter, Route, Link, Switch } from "react-router-native";
import { ListView } from "react-native";

//Options:
var BUTTONS = ["Yes, Delete!", "Cancel"];
var DESTRUCTIVE_INDEX = 0;
var CANCEL_INDEX = 1;

//Import Add Product Store
import newProduct from "../Store/AddProduct";

//Import Components
import TagList from "./addTags";
import ProductDetail from "../ProductDetail/ProductDetail";
import ProductStore from "../Store/ProductStore";

class addProduct extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      name: newProduct.name,
      description: newProduct.description,
      status: newProduct.status,
      type: newProduct.type,
      tag: newProduct.tag,
      tag1: newProduct.tag1,
      tag2: newProduct.tag2,
      tag3: newProduct.tag3,
      price: newProduct.price,
      type: newProduct.type,
      tagCounter: newProduct.tagCounter,
      pic: newProduct.pic,
      clicked: 1,
      selectedTag: undefined
    };
  }

  componentDidUpdate() {
    if (this.state.clicked === "Yes, Delete!") {
      newProduct.removeTag(this.state.selectedTag);
      this.setState({
        clicked: undefined,
        selectedTag: undefined
      });
    }
  }
  render() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    return (
      <View style={{ width: "90%", alignSelf: "center" }}>
        <Text style={{ fontWeight: "bold" }}>{""}</Text>
        <Text style={{ fontWeight: "bold" }}>Product Name:</Text>
        <Item floatingLabel>
          <Input
            placeholder="Write the Product Name here..."
            onChangeText={inputVal => newProduct.nameChange(inputVal)}
            value={newProduct.name}
          />
        </Item>
        <Text style={{ fontWeight: "bold" }}>{""}</Text>
        <Text style={{ fontWeight: "bold" }}>Product Description:</Text>
        <Item floatingLabel>
          <Input
            style={{ minHeight: 50 }}
            maxLength={250}
            multiline
            placeholder="Write your Product Description Here"
            onChangeText={inputVal => newProduct.descriptionChange(inputVal)}
            value={newProduct.description}
          />
        </Item>
        <Text style={{ fontWeight: "bold" }}>{""}</Text>
        <Item picker>
          <Text style={{ fontWeight: "bold" }}>Availability:</Text>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="ios-arrow-down-outline" />}
            placeholder="Select Status"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            selectedValue={newProduct.status}
            onValueChange={inputVal => newProduct.statusChange(inputVal)}
          >
            <Picker.Item label="Available" value="Available" />
            <Picker.Item label="Sold" value="Sold" />
          </Picker>
        </Item>
        <Text style={{ fontWeight: "bold" }}>{""}</Text>

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
            <Picker.Item label="Home" value="Home" />
            <Picker.Item label="Electronics" value="Electronics" />
            <Picker.Item label="Cars" value="Cars" />
            <Picker.Item label="Garden" value="Garden" />
            <Picker.Item label="Food" value="Food" />
          </Picker>
        </Item>
        <Text style={{ fontWeight: "bold" }}>{""}</Text>
        <Text style={{ fontWeight: "bold" }}>Add Tags:</Text>
        {newProduct.tagCounter === 0 && (
          <Item>
            <Link component={Button} small transparent to={"/addTag/0"}>
              <Icon small name="plus" type="Entypo" />
            </Link>
          </Item>
        )}

        {newProduct.tagCounter > 0 && (
          <SwipeRow
            style={{ justifyContent: "center", height: 50 }}
            leftOpenValue={0}
            rightOpenValue={-10}
            onRowOpen={() =>
              ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex: CANCEL_INDEX,
                  destructiveButtonIndex: DESTRUCTIVE_INDEX,
                  title: "Are you sure you want to Delete " + newProduct.tag[0]
                },
                buttonIndex => {
                  this.setState({
                    clicked: BUTTONS[buttonIndex],
                    selectedTag: 0
                  });
                }
              )
            }
            left={<Button transparent />}
            body={
              <Button full transparent>
                <Text style={{ alignSelf: "center", color: "black" }}>
                  {"   "}
                  {newProduct.tag[0]}
                </Text>
              </Button>
            }
            right={<Button danger />}
          />
        )}
        {newProduct.tagCounter === 1 && (
          <Item>
            <Link component={Button} small transparent to={"/addTag/1"}>
              <Icon small name="plus" type="Entypo" />
            </Link>
          </Item>
        )}

        {newProduct.tagCounter > 1 && (
          <SwipeRow
            style={{ justifyContent: "center", height: 50 }}
            leftOpenValue={0}
            rightOpenValue={-10}
            onRowOpen={() =>
              ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex: CANCEL_INDEX,
                  destructiveButtonIndex: DESTRUCTIVE_INDEX,
                  title: "Are you sure you want to Delete " + newProduct.tag[1]
                },
                buttonIndex => {
                  this.setState({
                    clicked: BUTTONS[buttonIndex],
                    selectedTag: 1
                  });
                }
              )
            }
            left={<Button transparent />}
            body={
              <Button full transparent>
                <Text style={{ alignSelf: "center", color: "black" }}>
                  {"   "}
                  {newProduct.tag[1]}
                </Text>
              </Button>
            }
            right={<Button danger />}
          />
        )}
        {newProduct.tagCounter === 2 && (
          <Item>
            <Link component={Button} small transparent to={"/addTag/2"}>
              <Icon small name="plus" type="Entypo" />
            </Link>
          </Item>
        )}
        {newProduct.tagCounter > 2 && (
          <SwipeRow
            style={{
              height: 50,
              justifyContent: "center"
            }}
            leftOpenValue={0}
            rightOpenValue={-10}
            onRowOpen={() =>
              ActionSheet.show(
                {
                  options: BUTTONS,
                  cancelButtonIndex: CANCEL_INDEX,
                  destructiveButtonIndex: DESTRUCTIVE_INDEX,
                  title: "Are you sure you want to Delete " + newProduct.tag[2]
                },
                buttonIndex => {
                  this.setState({
                    clicked: BUTTONS[buttonIndex],
                    selectedTag: 2
                  });
                }
              )
            }
            left={<Button transparent />}
            body={
              <Button full transparent>
                <Text style={{ alignSelf: "center", color: "black" }}>
                  {"   "}
                  {newProduct.tag[2]}
                </Text>
              </Button>
            }
            right={<Button danger />}
          />
        )}

        <Item>
          <Text style={{ fontWeight: "bold" }}>Price:</Text>
          <Input
            onChangeText={inputVal => newProduct.priceChange(inputVal)}
            placeholder="Write in the Price here..."
            value={"" + newProduct.price}
          />
          <Text>KD</Text>
        </Item>
        <Text style={{ fontWeight: "bold" }}> </Text>

        <Text style={{ fontWeight: "bold" }}>Image URL:</Text>
        <Item>
          <Input
            onChangeText={inputVal => newProduct.picChange(inputVal)}
            placeholder="Paste the image url here..."
            value={newProduct.pic}
          />
        </Item>
        {newProduct.pic && (
          <Image
            source={{ uri: newProduct.pic }}
            style={{ height: 200, width: null, flex: 1 }}
          />
        )}
        <Button
          full
          success
          onPress={() => {
            if (newProduct.name === "") {
              alert("Product Name cannot be blank");
            } else if (newProduct.description === "") {
              alert("Product Description cannot be blank");
            } else if (newProduct.type === "") {
              alert("Product Type cannot be blank");
            } else if (newProduct.status === "") {
              alert("Product Status cannot be blank");
            } else if (newProduct.status === "" || newProduct.price === 0) {
              alert("Product Price cannot be blank or 0");
            } else {
              newProduct.postProduct();
            }
          }}
        >
          <Text>Submit</Text>
        </Button>
        <Button full danger onPress={() => newProduct.resetPage()}>
          <Text>Reset Page</Text>
        </Button>
      </View>
    );
  }
}

export default observer(addProduct);
