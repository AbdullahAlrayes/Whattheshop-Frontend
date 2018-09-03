import { decorate, observable, computed, action } from "mobx";
import axios from "axios";
// In This page we will be creating the POST Request to the API.
import { NativeRouter, Route, Link, Switch } from "react-router-native";

//Stores
import ProductStore from "./ProductStore";

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
    this.tag = ["", "", ""];
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
    this.tag = ["", "", ""];
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

  addTag(value, ID) {
    this.tag[ID] = value;
    this.tagCounter += 1;
  }

  removeTag(ID) {
    this.tag.splice(ID, 1);
    this.tagCounter -= 1;
  }

  picChange(value: string) {
    this.pic = value;
  }

  postProduct() {
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
        indexVal = ProductStore.tags.findIndex(
          tag => tag.name.toLowerCase() === element.toLowerCase()
        );
        newTagIDs.push(ProductStore.tags[indexVal].id);
      });
    }
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

    this.sendobject = [
      {
        name: this.name,
        description: this.description,
        pic: this.pic,
        type: this.type,
        status: newStatus,
        tag: newTagIDs,
        price: this.price,
        created_by: 1
      }
    ];
    console.log(this.sendobject);
    return instance
      .post("api/products/create/", this.sendobject)
      .then(response => console.log("success"))
      .catch(err => console.log(err));
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
  tag1: observable,
  tag2: observable,
  tag3: observable,
  tagCounter: observable,
  tag: observable
});

export default new newProduct();
