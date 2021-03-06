import { decorate, observable, computed, action } from "mobx";
import axios from "axios";

//Import Stores
import ProductStore from "./ProductStore";
import OrderStore from "./OrderSNStore";
const instance = axios.create({
  baseURL: "http://178.128.202.231"
});

class CartsStore {
  constructor() {
    this.items = [];
    this.discountCode = "";
    this.acceptedDiscounts = {
      noobdiscount: 0.1,
      helloworld: 0.2,
      everystoreultimate: 0.5
    };
  }

  addCart(product, newQuant) {
    let indexVal = this.items.findIndex(item => item.id === product.id);
    if (indexVal < 0) {
      this.items.push({
        id: product.id,
        price: product.price,
        quantity: newQuant,
        newPrice: product.price * (1 - this.discountConfirmation)
      });
    } else {
      this.items[indexVal].quantity += newQuant;
    }
  }

  removeCart(product, newQuant) {
    let indexVal = this.items.findIndex(item => item.id === product.id);
    if (this.items[indexVal].quantity - newQuant <= 0) {
      this.items.pop(indexVal);
    } else {
      this.items[indexVal].quantity -= newQuant;
    }
  }

  uploadFinalOrder(orderSN) {
    return instance
      .post("api/order-serial-no/create/", { name: orderSN })
      .then(response => console.log("success"))
      .catch(err => console.log(err.response));
  }

  uploadOrder(userID, orderSNList, productObject) {
    return instance
      .post("api/orders/create/", {
        price: +this.totalPrice,
        status: 1,
        created_by: +userID,
        updated_by: +userID,
        orderSerialNo: orderSNList
      })
      .then(response => console.log("success"))
      .then(response => {
        for (let i = 0; i < productObject.length; i++) {
          ProductStore.removeItemsPutRequest(
            productObject[i].id,
            productObject[i].remainingQuant,
            productObject[i].orderQuant
          );
        }
      })
      .then(() => {
        OrderStore.fetchOrderSNs();
        OrderStore.fetchOrderHistory();
        ProductStore.fetchProducts();
      })
      .then(() => (this.items = []))
      .catch(err => console.log(err.response));
  }

  updateDiscount(inputVal) {
    this.discountCode = inputVal;
  }

  get totalPrice() {
    let totalCart = 0;
    this.items.forEach((item, index) => {
      totalCart +=
        +item.newPrice * (1 - this.discountConfirmation) * +item.quantity;
    });
    return totalCart;
  }

  get discountConfirmation() {
    let matchDiscount;
    matchDiscount = this.acceptedDiscounts[this.discountCode.toLowerCase()];
    return matchDiscount || 0;
  }

  removeItem(index, price) {
    this.items.splice(index, 1);
  }
}

decorate(CartsStore, {
  items: observable,
  totalPrice: computed,
  discountCode: observable,
  acceptedDiscounts: observable,
  discountConfirmation: computed
});
const CartStore = new CartsStore();

export default CartStore;
