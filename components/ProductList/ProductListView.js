import { decorate, observable, computed, action } from "mobx";
import axios from "axios";

class ProductStore {
  constructor() {
    this.product = productList;
  }
}
decorate(StoreUpdate, {
  product: observable
});
const ProductStore = new ProductStore();
ProductStore.fetchchannels();

export default ProductStore;
