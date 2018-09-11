import { decorate, observable, computed, action } from "mobx";
import axios from "axios";
// In This page we will be creating the POST Request to the API.
import { NativeRouter, Route, Link, Switch } from "react-router-native";

//Stores
import ProductStore from "./ProductStore";
import UserStore from "./UserStore";

const instance = axios.create({
  baseURL: "http://178.128.202.231"
});

class updateProductStore {
  constructor() {
    this.name = "";
    this.description = "";
    this.status = "Available";
    this.type = "";
    this.price = 0;
    this.quantity = 0;
    this.tag = [];
    this.tagCounter = 0;
    this.pic = "";
    this.prodID = 0;
  }

  updateStoreItems(prodID) {
    this.tag = [];
    this.name = ProductStore.products[prodID].name;
    this.description = ProductStore.products[prodID].description;
    this.status = ProductStore.products[prodID].status.name;
    this.type = ProductStore.products[prodID].type.name;
    this.price = +ProductStore.products[prodID].price;
    this.pic = ProductStore.products[prodID].pic;
    this.quantity = +ProductStore.products[prodID].quantity;
    ProductStore.products[prodID].tag.map((tag, index) =>
      this.tag.push(tag.name)
    );
    this.tagCounter = this.tag.length;
    this.prodID = ProductStore.products[prodID].id;
  }

  nameChange(inputVal) {
    this.name = inputVal;
  }
  descriptionChange(inputVal) {
    this.description = inputVal;
  }
  statusChange(inputVal) {
    this.status = inputVal;
  }
  typeChange(inputVal) {
    this.type = inputVal;
  }
  priceChange(inputVal) {
    this.price = inputVal;
  }
  quantityChange(inputVal) {
    this.quantity += inputVal;
  }
  addTag(value) {
    this.tag.push(value);
    this.tagCounter += 1;
  }

  removeTag(ID) {
    this.tag.splice(ID, 1);
    this.tagCounter -= 1;
  }

  putProduct(history, imageUpload) {
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

    const data = new FormData();

    this.sendobject = [
      {
        name: this.name,
        description: this.description,
        pic: this.pic,
        type: newType,
        status: newStatus,
        tag: newTagIDs,
        price: this.price,
        created_by: UserStore.signedInUser.user_id,
        pic: imageUpload
      }
    ];

    data.append("upload", this.sendobject);
    // data.append("image", {
    //   uri: imageUpload,
    //   name: this.prodID + "image",
    //   type: "image/png"
    // });

    console.log(this.prodID);
    console.log(this.sendobject);

    fetch("http://178.128.202.231api/products/update/" + this.prodID, {
      method: "PUT",
      body: data
    });

    // return instance
    //   .put("api/products/update/" + this.prodID, {
    //     name: this.name,
    //     description: this.description,
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
}
decorate(updateProductStore, {
  name: observable,
  description: observable,
  status: observable,
  type: observable,
  price: observable,
  quantity: observable,
  tag: observable,
  prodID: observable
});
export default new updateProductStore();
