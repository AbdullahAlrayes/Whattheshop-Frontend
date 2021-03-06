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
  Card,
  Picker,
  Input,
  Textarea,
  View
} from "native-base";
import { Image, CameraRoll } from "react-native";
import { observer } from "mobx-react";
import { NativeRouter, Route, Link, Switch } from "react-router-native";
import { ListView } from "react-native";
import { ImagePicker, Permissions } from "expo";

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
import TypeList from "./addTypes";
import StatusList from "./addStatus";
import SelectedTags from "./selectedTagComp";
import { ScrollView } from "react-native-gesture-handler";

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
      selectedTag: undefined,
      quantity: 1,
      image: null,
      cameraPermission: null,
      cameraRollPermission: null
    };
  }

  async componentDidMount() {
    const cameraPermission = await Permissions.getAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.getAsync(
      Permissions.CAMERA_ROLL
    );
    this._reqCameraPermissions;
    this._reqCameraRollPermissions;

    this.setState({
      cameraPermission: cameraPermission.status,
      cameraRollPermission: cameraRollPermission.status
    });
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

  uploadImage() {
    const formData = new FormData();
    formData.append("upload", {
      uri: this.state.image,
      name: this.state.name + ".png",
      type: "image/png"
    });
  }

  render() {
    let { image } = this.state;

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    return (
      <ScrollView>
        <Button full disabled light>
          <Text>Create a New Product</Text>
        </Button>
        <Card style={{ width: "95%", alignSelf: "center" }}>
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
          <StatusList />
          <TypeList />
          <SelectedTags />

          <Text style={{ fontWeight: "bold" }}>{""}</Text>
          <Text style={{ fontWeight: "bold" }}>Add Tags:</Text>

          <Item>
            <Text style={{ fontWeight: "bold" }}>Price:</Text>
            <Input
              onChangeText={inputVal => newProduct.priceChange(inputVal)}
              placeholder="Write in the Price here..."
              value={"" + newProduct.price}
            />
            <Text>KD</Text>
          </Item>
          <Item>
            <Text style={{ fontWeight: "bold" }}>Quantity Available:</Text>
            <Text> {newProduct.quantity} </Text>
            <Button
              small
              rounded
              success
              onPress={() => newProduct.quantityChange(1)}
            >
              <Text style={{ fontWeight: "bold" }}>+</Text>
            </Button>
          </Item>
          <Text style={{ fontWeight: "bold" }}> </Text>

          <Text style={{ fontWeight: "bold" }}>Image URL:</Text>
          <Button full primary onPress={this._pickImage}>
            {this.state.image ? (
              <Text>Change Image</Text>
            ) : (
              <Text>Upload Image</Text>
            )}
          </Button>
          {this.state.image && (
            <Image source={{ uri: this.state.image }} style={{ height: 200 }} />
          )}
          <Text> </Text>

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
                newProduct.postProduct(this.props.history, this.state.image);
              }
            }}
          >
            <Text>Submit</Text>
          </Button>
          <Button full danger onPress={() => newProduct.resetPage()}>
            <Text>Reset Page</Text>
          </Button>
          <Button full danger onPress={() => alert(this.state.image)}>
            <Text>Send Image</Text>
          </Button>
        </Card>
      </ScrollView>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      CameraRoll.saveToCameraRoll(result.uri);
    }
  };

  _reqCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ cameraPermission: status });
  };

  _reqCameraRollPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ cameraRollPermission: status });
  };
}
export default observer(addProduct);
