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
    this.status = "";
  }

  changeCurrentProduct(productID) {
    let indexVal = this.products.findIndex(product => product.id === productID);
    this.productID = productID;
  }

  tagSearch(value) {
    this.tagQuery = value;
  }

  get filteredTags() {
    return this.tags.filter(tag =>
      `${tag.name}`.toLowerCase().includes(this.tagQuery.toLowerCase())
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
      .then(prod => console.log(prod))
      .catch(err => console.error(err));
  }
  updateCurrentProduct() {}
}
decorate(ProductsStore, {
  products: observable,
  tags: observable,
  tagQuery: observable,
  filteredTags: computed
});
const ProductStore = new ProductsStore();
ProductStore.fetchProducts();
ProductStore.fetchTags();
export default ProductStore;
