import { decorate, observable, computed, action } from "mobx";
import axios from "axios";
import { StyleSheet, Text, View } from "react-native";
//Import Stores
import newProduct from "./AddProduct";

const instance = axios.create({
  baseURL: "http://178.128.202.231"
});

class ProductsStore {
  constructor() {
    this.products = [];
    this.productID = {};
    this.tags = [];
    this.tagQuery = "";
    this.status = {};
    this.types = {};
    this.productQuery = "";
    this.selectedUser = 1;
  }

  removeQuantityFromProduct(prodID) {
    let indexVal = this.products.findIndex(product => product.id === prodID);
    this.products[indexVal].quantity -= 1;
  }
  addQuantityFromProduct(prodID) {
    let indexVal = this.products.findIndex(product => product.id === prodID);
    this.products[indexVal].quantity += 1;
  }
  removeFromCart(prodID, quant) {
    let indexVal = this.products.findIndex(product => product.id === prodID);
    this.products[indexVal].quantity += quant;
  }

  changeCurrentProduct(prodID) {
    let indexVal = this.products.findIndex(product => product.id === prodID);
    this.productID = prodID;
  }

  tagSearch(value) {
    this.tagQuery = value;
  }

  productSearch(value) {
    this.productQuery = value;
  }

  get filteredTags() {
    return this.tags.filter(tag =>
      `${tag.name} `.toLowerCase().includes(this.tagQuery.toLowerCase())
    );
  }

  get filteredProductsByUser() {
    return this.products.filter(
      product => +product.created_by.id === +this.selectedUser
    );
  }
  get filteredProducts() {
    return this.products.filter(tag =>
      `${tag.name} ${tag.type.name} ${tag.description}`
        .toLowerCase()
        .includes(this.productQuery.toLowerCase())
    );
  }

  addTag(value) {
    let indexVal = this.tags.findIndex(
      tag => tag.name.toLowerCase() === value.toLowerCase()
    );
    if (indexVal >= -0.5) {
      console.log("Already Exists");
    } else {
      this.tags.push({ name: value, id: this.tags.length + 1 });
      return instance
        .post("api/tags/create/", { name: value })
        .then(response => console.log("success"))
        .catch(err => console.log(err));
    }
  }

  fetchTags() {
    return instance
      .get("api/tags/list/?format=json")
      .then(res => res.data)
      .then(
        tag =>
          (this.tags = tag.sort((a, b) => {
            if (a.name < b.name) return -1;
            else return 0;
          }))
      )
      .catch(err => console.error(err));
  }
  fetchProducts() {
    return instance
      .get("api/products/list/?format=json")
      .then(res => res.data)
      .then(products => (this.products = products))
      .catch(err => console.error(err));
  }
  fetchTypes() {
    return instance
      .get("api/products-types/list/?format=json")
      .then(res => res.data)
      .then(type => (this.types = type))
      .catch(err => console.error(err));
  }
  fetchStatus() {
    return instance
      .get("api/products-status/list/?format=json")
      .then(res => res.data)
      .then(stat => (this.status = stat))
      .catch(err => console.error(err));
  }

  updateCurrentProduct() {}
}
decorate(ProductsStore, {
  products: observable,
  tags: observable,
  tagQuery: observable,
  filteredTags: computed,
  productQuery: observable,
  filteredProducts: computed,
  filteredProductsByUser: computed
});
const ProductStore = new ProductsStore();
ProductStore.fetchProducts();
ProductStore.fetchTags();
ProductStore.fetchStatus();
ProductStore.fetchTypes();
export default ProductStore;
