import { decorate, observable, computed, action } from "mobx";
import axios from "axios";

//Import Stores
import ProductStore from "./ProductStore";

const instance = axios.create({
  baseURL: "http://178.128.202.231"
});

class CartsStore {
  constructor() {
    this.items = [];
    this.totalPrice = 0;
  }

  updateCart(product) {
    this.items.push(product);
    this.totalPrice += product.price;
  }

  removeItem(index, price) {
    this.totalPrice -= this.items[index].price;
    this.items.splice(index, 1);
  }

  resetCart() {
    this.items = [];
    this.totalPrice = 0;
  }
}

decorate(CartsStore, {
  items: observable,
  totalPrice: observable
});
const CartStore = new CartsStore();

export default CartStore;
