import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Text,
  Item,
  Radio,
  Button,
  ListItem,
  Left,
  Icon,
  Right,
  Picker,
  Input,
  Textarea,
  View
} from "native-base";
import { Image } from "react-native";

//Import Add Product Store
import ProductStore from "../Store/AddProduct";

export default class addProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      status: "Available",
      type: "",
      tag: [],
      tag1: "",
      tag2: "",
      tag3: "",
      price: "",
      type: "Available",
      tagCounter: 0,
      imageurl: ""
    };
  }
  nameChange(value: string) {
    this.setState({
      name: value
    });
  }
  descriptionChange(value: string) {
    this.setState({
      description: value
    });
  }
  statusChange(value: string) {
    this.setState({
      status: value
    });
  }
  priceChange(value: string) {
    this.setState({
      price: value
    });
  }
  typeChange(value: string) {
    this.setState({
      type: value
    });
  }
  tag1Change(value: string) {
    this.setState({
      tag1: value
    });
  }
  tag2Change(value: string) {
    this.setState({
      tag2: value
    });
  }
  tag3Change(value: string) {
    this.setState({
      tag3: value
    });
  }

  imageChange(value: string) {
    this.setState({
      imageurl: value
    });
    console.log(this.state.imageurl);
  }
  tagChange(value: string) {
    this.setState({
      tagCounter: this.state.tagCounter + 1
    });
    console.log(this.state.tagCounter);
  }
  submitButton() {
    this.setState({ tag: [] });
    if (this.state.tag1.length > 0) {
      this.state.tag.push(this.state.tag1);
    }
    if (this.state.tag2.length > 0) {
      this.state.tag.push(this.state.tag2);
    }
    if (this.state.tag3.length > 0) {
      this.state.tag.push(this.state.tag3);
    }

    console.log("Product Name: " + this.state.name);
    console.log("Product Description: " + this.state.description);
    console.log("Product Type: " + this.state.type);
    console.log("Product Price: " + this.state.price + " KD");
    console.log("Product Tags: " + this.state.tag);
    console.log("Image URL: " + this.state.pic);
  }

  render() {
    return (
      <View style={{ width: "90%", alignSelf: "center" }}>
        <Text style={{ fontWeight: "bold" }}>{""}</Text>
        <Text style={{ fontWeight: "bold" }}>Product Name:</Text>
        <Item floatingLabel>
          <Input
            placeholder="Write the product name here..."
            onChangeText={this.nameChange.bind(this)}
          />
        </Item>
        <Text style={{ fontWeight: "bold" }}>{""}</Text>
        <Text style={{ fontWeight: "bold" }}>Product Description:</Text>
        <Item floatingLabel>
          <Input
            style={{ minHeight: 50 }}
            maxLength={250}
            multiline
            placeholder="Write the product description here..."
            onChangeText={this.descriptionChange.bind(this)}
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
            selectedValue={this.state.status}
            onValueChange={this.statusChange.bind(this)}
          >
            <Picker.Item label="Available" value="Available" />
            <Picker.Item label="Not Available" value="Not Available" />
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
            selectedValue={this.state.type}
            onValueChange={this.typeChange.bind(this)}
          >
            <Picker.Item label="Home" value="Home" />
            <Picker.Item label="Electronics" value="Electronics" />
            <Picker.Item label="Cars" value="Cars" />
            <Picker.Item label="Garden" value="Garden" />
            <Picker.Item label="Food" value="Food" />
          </Picker>
        </Item>
        <Text style={{ fontWeight: "bold" }}>{""}</Text>
        <Text style={{ fontWeight: "bold" }}>
          Add Tags:
          {this.state.tagCounter < 2 && (
            <Icon name="plus" type="Entypo" onPress={() => this.tagChange()} />
          )}
        </Text>
        <Item floatingLabel>
          <Input
            onChangeText={this.tag1Change.bind(this)}
            placeholder="Write Tag 1 here..."
          />
        </Item>
        {this.state.tagCounter > 0 && (
          <Item floatingLabel>
            <Input
              onChangeText={this.tag2Change.bind(this)}
              placeholder="Write Tag 2 here..."
            />
          </Item>
        )}
        {this.state.tagCounter > 1 && (
          <Item floatingLabel>
            <Input
              onChangeText={this.tag3Change.bind(this)}
              placeholder="Write Tag 3 here..."
            />
          </Item>
        )}
        <Item>
          <Text style={{ fontWeight: "bold" }}>Price:</Text>
          <Input
            onChangeText={this.priceChange.bind(this)}
            placeholder="Write Price here..."
          />
          <Text>KD</Text>
        </Item>
        <Text style={{ fontWeight: "bold" }}> </Text>

        <Text style={{ fontWeight: "bold" }}>Image URL:</Text>
        <Item>
          <Input
            onChangeText={this.imageChange.bind(this)}
            placeholder="Paste URL here"
          />
        </Item>
        {this.state.imageurl && (
          <Image
            source={{ uri: this.state.imageurl }}
            style={{ height: 200, width: null, flex: 1 }}
          />
        )}
        <Button full success onPress={() => this.submitButton()}>
          <Text>Success</Text>
        </Button>
      </View>
    );
  }
}
