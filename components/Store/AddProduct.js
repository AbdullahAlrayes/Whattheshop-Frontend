import { decorate, observable, computed, action } from "mobx";
import axios from "axios";
// In This page we will be creating the POST Request to the API.
import { NativeRouter, Route, Link, Switch } from "react-router-native";

//Stores
import ProductStore from "./ProductStore";
import UserStore from "../Store/UserStore";
import UsersList from "../ProductList/UsersList";

const instance = axios.create({
  baseURL: "http://178.128.202.231"
});

class newProduct {
  constructor() {
    this.name = "";
    this.description = "";
    this.status = "Available";
    this.type = "";
    this.price = 0;
    this.created_by = "Admin";
    this.updated_by = "Admin";
    this.created_on = "";
    this.updated_on = "";
    this.pic = "";
    this.sendobject = [];
    this.tagCounter = 0;
    this.tag = [];
    this.quantity = 1;
    this.selectedProduct = 0;
  }

  resetPage() {
    this.name = "";
    this.description = "";
    this.status = "Available";
    this.type = "";
    this.price = 0;
    this.created_by = "Admin";
    this.updated_by = "Admin";
    this.created_on = "";
    this.updated_on = "";
    this.pic = "";
    this.sendobject = [];
    this.tagCounter = 0;
    this.tag = [];
    this.quantity = 1;
  }

  nameChange(value: string) {
    this.name = value;
  }
  descriptionChange(value: string) {
    this.description = value;
  }
  statusChange(value: string) {
    this.status = value;
  }
  priceChange(value: string) {
    this.price = value;
  }
  typeChange(value: string) {
    this.type = value;
  }
  quantityChange(value) {
    this.quantity += value;
  }

  updateQuantity(value) {
    this.quantity += value;
  }

  addTag(value) {
    this.tag.push(value);
    this.tagCounter += 1;
  }

  removeTag(ID) {
    this.tag.splice(ID, 1);
    this.tagCounter -= 1;
  }

  picChange(value: string) {
    this.pic = value;
  }

  postProduct(history, imageUpload) {
    let newTagIDs = [];
    let combinedTagList = [];
    let combinedTagsCheck = this.tag.join("");

    this.tag.forEach(element => {
      if (element === "") {
      } else {
        combinedTagList.push(element);
      }
    });

    if (combinedTagList.length === 0) {
    } else {
      let indexVal;
      combinedTagList.forEach(element => {
        indexVal = ProductStore.originalTags.findIndex(
          tag => tag.name.toLowerCase() === element.toLowerCase()
        );
        newTagIDs.push(ProductStore.originalTags[indexVal].id);
      });
    }

    let typeVal;
    let newType;

    typeVal = ProductStore.originalTypes.findIndex(
      type => type.name === this.type
    );
    newType = ProductStore.originalTypes[typeVal].id;
    console.log(newTagIDs);
    // let statusVal = ProductStore.products.status.findIndex(
    //   stat => stat.name.toLowerCase() === this.status.toLowerCase()
    // );
    // let newStatus = ProductStore.products.status[statusVal].id;
    let newStatus;
    if ((this.status = "Available")) {
      newStatus = 2;
    } else if ((this.status = "Sold")) {
      newStatus = 1;
    }
    if (this.pic === "") {
      this.pic = undefined;
    }

    this.sendobject = [
      {
        name: this.name,
        description: this.description,
        pic: this.pic,
        type: newType,
        status: newStatus,
        tag: newTagIDs,
        price: this.price,
        created_by: UserStore.signedInUser.user_id
      }
    ];

    const data = new FormData();
    data.append("name", this.name);
    data.append("description", this.description);
    data.append("type", newType);
    data.append("status", newStatus);
    data.append("quantity", this.quantity);
    // data.append("tag", newTagIDs);

    for (var i = 0; i < newTagIDs.length; i++) {
      data.append("tag", newTagIDs[i]);
    }

    data.append("price", this.price);
    data.append("created_by", UserStore.signedInUser.user_id);
    if (imageUpload !== null) {
      data.append("pic", {
        uri: imageUpload,
        name: "image" + this.name + "image.png",
        type: "image/png"
      });
    }

    console.log("---------------------------------");
    return instance
      .post("api/products/create/", data)
      .then(res => res.data)
      .then(res => console.log("success"))
      .then(res => {
        ProductStore.fetchProducts();
        ProductStore.fetchTags();
        ProductStore.fetchStatus();
        ProductStore.fetchTypes();

        console.log("success");
        history.goBack();
      })
      .catch(err => console.log(err.response));

    // return instance
    //   .post("api/products/create/", {
    //     name: this.name,
    //     description: this.description,
    //     pic: this.pic,
    //     type: newType,
    //     status: newStatus,
    //     tag: newTagIDs,
    //     price: this.price,
    //     created_by: UserStore.signedInUser.user_id,
    //     quantity: this.quantity
    //   })
    //   .then(response => {
    //     ProductStore.fetchProducts();
    //     ProductStore.fetchTags();
    //     ProductStore.fetchStatus();
    //     ProductStore.fetchTypes();
    //     console.log("success");
    //     history.goBack();
    //   })
    //   .catch(err => console.log(err.response));
  }
  updateStore(name, description, status, type, price, tags, pic) {
    this.name = name;
    this.description = description;
    this.type = type;
    this.status = status;
    this.price = price;
    this.tags = tags;
    this.pic = pic;
    this.postProduct();
  }
}
decorate(newProduct, {
  name: observable,
  description: observable,
  status: observable,
  type: observable,
  tag: observable,
  price: observable,
  created_by: observable,
  updated_by: observable,
  created_on: observable,
  updated_on: observable,
  pic: observable,
  tagCounter: observable,
  tag: observable,
  selectedProduct: observable,
  quantity: observable
});

export default new newProduct();
