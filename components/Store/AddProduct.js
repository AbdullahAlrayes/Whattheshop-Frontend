import { decorate, observable, computed, action } from "mobx";
import axios from "axios";

class ProductStore {
  constructor() {
    (this.name = ""),
      (this.description = ""),
      (this.status = ""),
      (this.type = ""),
      (this.tag = []),
      (this.price = 0),
      (this.created_by = "Admin"),
      (this.updated_by = "Admin"),
      (this.created_on = ""),
      (this.updated_on = ""),
      (this.pic = "");
  }
}
decorate(ProductStore, {
  product: observable
});

export default new ProductStore();
