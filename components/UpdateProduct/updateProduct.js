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
import UpdateProductStore from "../Store/UpdateProductStore";

//Import Components
import TagList from "./addTags";
import ProductDetail from "../ProductDetail/ProductDetail";
import ProductStore from "../Store/ProductStore";
import TypeList from "./addTypes";
import StatusList from "./addStatus";
import SelectedTags from "./selectedTagComp";
import { ScrollView } from "react-native-gesture-handler";

class UpdateProduct extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      name: UpdateProductStore.name,
      image: null,
      cameraPermission: null,
      cameraRollPermission: null,
      formImage: null
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

  uploadImage() {
    const formData = new FormData();
    formData.append("upload", {
      uri: this.state.image,
      name: this.state.name + ".png",
      type: "image/png"
    });
    this.setState({ formImage: formData });
    console.log(this.state.formImage);
  }

  render() {
    let { image } = this.state;
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    return (
      <ScrollView>
        <Button full disabled light>
          <Text>Update an Existing Product</Text>
        </Button>

        <Card style={{ width: "95%", alignSelf: "center" }}>
          <Text style={{ fontWeight: "bold" }}>{""}</Text>
          <Text style={{ fontWeight: "bold" }}>Product Name:</Text>
          <Item floatingLabel>
            <Input
              placeholder="Write the Product Name here..."
              onChangeText={inputVal => UpdateProductStore.nameChange(inputVal)}
              value={UpdateProductStore.name}
            />
          </Item>
        </Card>
        <Card style={{ width: "95%", alignSelf: "center" }}>
          <Text style={{ fontWeight: "bold" }}>{""}</Text>
          <Text style={{ fontWeight: "bold" }}>Product Description:</Text>
          <Item floatingLabel>
            <Input
              placeholder="Write the Product Name here..."
              onChangeText={inputVal =>
                UpdateProductStore.descriptionChange(inputVal)
              }
              value={UpdateProductStore.description}
            />
          </Item>
          <StatusList />
          <TypeList />
          <SelectedTags />

          <Item>
            <Text style={{ fontWeight: "bold" }}>Price:</Text>
            <Input
              onChangeText={inputVal =>
                UpdateProductStore.priceChange(inputVal)
              }
              placeholder="Write in the Price here..."
              value={"" + UpdateProductStore.price}
            />
            <Text>KD</Text>
          </Item>
          <Item>
            <Text style={{ fontWeight: "bold" }}>Quantity Available:</Text>
            <Button
              small
              rounded
              danger
              disabled={UpdateProductStore.quantity === 1}
              onPress={() => UpdateProductStore.quantityChange(-1)}
            >
              <Text style={{ fontWeight: "bold" }}>-</Text>
            </Button>
            <Text> {UpdateProductStore.quantity} </Text>
            <Button
              small
              rounded
              success
              onPress={() => UpdateProductStore.quantityChange(1)}
            >
              <Text style={{ fontWeight: "bold" }}>+</Text>
            </Button>
          </Item>
        </Card>

        <Text style={{ fontWeight: "bold" }}>Image URL:</Text>
        <Button full primary onPress={this._pickImage}>
          {this.state.image ? (
            <Text>Change Image</Text>
          ) : (
            <Text>Upload Image</Text>
          )}
        </Button>
        {this.state.image && (
          <View>
            <Button onPress={() => this.uploadImage()}>
              <Text>Send Image Details</Text>
            </Button>
            <Image source={{ uri: this.state.image }} style={{ height: 200 }} />
          </View>
        )}

        <Text> </Text>

        <Button
          full
          success
          onPress={() => {
            if (UpdateProductStore.name === "") {
              alert("Product Name cannot be blank");
            } else if (UpdateProductStore.description === "") {
              alert("Product Description cannot be blank");
            } else if (UpdateProductStore.type === "") {
              alert("Product Type cannot be blank");
            } else if (UpdateProductStore.status === "") {
              alert("Product Status cannot be blank");
            } else if (
              +UpdateProductStore.price === 0 ||
              UpdateProductStore.price === ""
            ) {
              alert("Product Price cannot be blank or 0");
            } else {
              UpdateProductStore.putProduct(
                this.props.history,
                this.state.image
              );
            }
          }}
        >
          <Text>Submit</Text>
        </Button>
        <Button
          full
          danger
          onPress={() =>
            UpdateProductStore.updateStoreItems(
              this.props.match.params.productID
            )
          }
        >
          <Text>Reset Page</Text>
        </Button>
      </ScrollView>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();

    console.log(result);
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
export default observer(UpdateProduct);
