import { decorate, observable, computed, action } from "mobx";
import axios from "axios";

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
  }

  changeCurrentProduct(productID) {
    let indexVal = this.products.findIndex(product => product.id === productID);
    this.productID = productID;
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
      .then(tag => (this.tags = tag))
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
  filteredProducts: computed
});
const ProductStore = new ProductsStore();
ProductStore.fetchProducts();
ProductStore.fetchTags();
ProductStore.fetchStatus();
ProductStore.fetchTypes();
export default ProductStore;
