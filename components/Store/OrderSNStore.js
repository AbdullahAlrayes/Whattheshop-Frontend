import { decorate, observable, computed, action } from "mobx";
import axios from "axios";
import { StyleSheet, Text, View } from "react-native";
//Import Stores
import newProduct from "./AddProduct";

const instance = axios.create({
  baseURL: "http://178.128.202.231"
});

class OrdersStore {
  constructor() {
    this.orederSN = [];
    this.userID = 1;
  }

  fetchOrderSNs() {
    return instance
      .get("api/order-serial-no/list/?format=json")
      .then(res => res.data)
      .then(
        order =>
          (this.orederSN = order.sort((a, b) => {
            if (a.id > b.id) return -1;
            else return 0;
          }))
      )
      .then(order => console.log(order[0].id))
      .catch(err => console.error(err));
  }
}
decorate(OrdersStore, {
  orderSN: observable,
  userID: observable
});
const OrderStore = new OrdersStore();
OrderStore.fetchOrderSNs();
export default OrderStore;
