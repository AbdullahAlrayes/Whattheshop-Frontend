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
    this.originalTags = [];
    this.originalTypes = [];
    this.tagQuery = "";
    this.status = {};
    this.types = {};
    this.productQuery = "";
    this.selectedUser = 1;
    this.loading = false;
    this.typeFilter = null;
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
    if (this.typeFilter === null) {
      return this.products.filter(tag =>
        `${tag.name} ${tag.type.name} ${tag.description}`
          .toLowerCase()
          .includes(this.productQuery.toLowerCase())
      );
    } else {
      return this.products.filter(
        tag =>
          `${tag.name} ${tag.type.name} ${tag.description}`
            .toLowerCase()
            .includes(this.productQuery.toLowerCase()) &&
          tag.type.name.includes(this.typeFilter)
      );
    }
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
        .then(response => this.fetchTags())
        .then(response => console.log("success"))
        .catch(err => console.log(err.response));
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
      .then(this.fetchOriginalTags())
      .catch(err => console.error(err));
  }
  fetchOriginalTags() {
    return instance
      .get("api/tags/list/?format=json")
      .then(res => res.data)
      .then(tag => (this.originalTags = tag))
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
    return (
      instance
        .get("api/products-types/list/?format=json")
        .then(res => res.data)
        .then(
          type =>
            (this.types = type.sort((a, b) => {
              if (a.name < b.name) return -1;
              else return 0;
            }))
        )
        // .then(type => (this.types = type))
        .then(type => this.fetchOriginalTypes())
        .then(type => (this.loading = true))
        .catch(err => console.error(err))
    );
  }
  fetchOriginalTypes() {
    return (
      instance
        .get("api/products-types/list/?format=json")
        .then(res => res.data)
        .then(type => (this.originalTypes = type))
        // .then(type => (this.types = type))
        .then(type => (this.loading = true))
        .catch(err => console.error(err))
    );
  }
  fetchStatus() {
    return instance
      .get("api/products-status/list/?format=json")
      .then(res => res.data)
      .then(stat => (this.status = stat))
      .catch(err => console.error(err));
  }

  removeItemsPutRequest(itemID, remainingQuant, orderQuant) {
    let indexVal = this.products.findIndex(product => product.id === itemID);

    let existingTags = [];

    if (this.products[indexVal].tag.length > 0) {
      this.products[indexVal].tag.forEach((tag, index) => {
        existingTags.push(tag.id);
      });
    }
    return instance
      .put("api/products/update/" + itemID, {
        name: this.products[indexVal].name,
        description: this.products[indexVal].description,
        type: this.products[indexVal].type.id,
        status: this.products[indexVal].status.id,
        tag: existingTags,
        created_by: this.products[indexVal].created_by.id,
        price: this.products[indexVal].price,
        quantity: remainingQuant
      })
      .then(res => res.data)
      .then(res => console.log("product updated"))
      .then(res => this.fetchProducts())
      .catch(err => console.log(err.response));
  }

  updateCurrentProduct() {}
}
decorate(ProductsStore, {
  products: observable,
  tags: observable,
  tagQuery: observable,
  filteredTags: computed,
  productQuery: observable,
  types: observable,
  loading: observable,
  filteredProducts: computed,
  filteredProductsByUser: computed,
  typeFilter: observable,
  originalTags: observable,
  originalTypes: observable
});
const ProductStore = new ProductsStore();
ProductStore.fetchProducts();
ProductStore.fetchTags();
ProductStore.fetchStatus();
ProductStore.fetchTypes();
export default ProductStore;
