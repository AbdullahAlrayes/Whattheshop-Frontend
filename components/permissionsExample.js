import React from "react";
import { Button, View, Image, Text, CameraRoll } from "react-native";
import { ImagePicker, Permissions } from "expo";

export default class ImagePickerExample extends React.Component {
  state = {
    image: null,
    cameraPermission: null,
    cameraRollPermission: null
  };

  async componentDidMount() {
    const cameraPermission = await Permissions.getAsync(Permissions.CAMERA);
    const cameraRollPermission = await Permissions.getAsync(
      Permissions.CAMERA_ROLL
    );

    this.setState({
      cameraPermission: cameraPermission.status,
      cameraRollPermission: cameraRollPermission.status
    });
  }

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button title="Take A Pic" onPress={this._takePicture} />
          <Button
            title="Pick an image from camera roll"
            onPress={this._pickImage}
          />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button
            title="Check CAMERA permissions"
            onPress={this._checkCameraPermissions}
          />
          <Button
            title="Check CAMERA_ROLL permissions"
            onPress={this._checkCameraRollPermissions}
          />
          <Button
            title="Ask for CAMERA permissions"
            onPress={this._reqCameraPermissions}
          />
          <Button
            title="Ask for CAMERA_ROLL permissions"
            onPress={this._reqCameraRollPermissions}
          />
          <Text>
            this.state.cameraPermission = {"" + this.state.cameraPermission}
          </Text>
          <Text>
            this.state.cameraRollPermission ={" "}
            {"" + this.state.cameraRollPermission}
          </Text>
        </View>
      </View>
    );
  }

  _checkCameraPermissions = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA);
    // const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    this.setState({ status });
  };
  _reqCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ cameraPermission: status });
  };

  _checkCameraRollPermissions = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    this.setState({ status });
  };
  _reqCameraRollPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ cameraRollPermission: status });
  };

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();

    console.log(result);
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      CameraRoll.saveToCameraRoll(result.uri);
    }
  };

  _takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync();
    // let result = await ImagePicker.launchImageLibraryAsync();

    console.log(result);
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      CameraRoll.saveToCameraRoll(result.uri);
    }
  };
}
