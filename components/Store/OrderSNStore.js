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
    this.orderSN = [];
    this.orders = [];
    this.userID = 2;
    this.selectedOrder = 0;
  }

  fetchOrderHistory() {
    return instance
      .get("api/orders/list/?format=json")
      .then(res => res.data)
      .then(
        orderList =>
          (this.orders = orderList.sort((a, b) => {
            if (a.id > b.id) return -1;
            else return 0;
          }))
      )
      .catch(err => console.log(err));
  }

  get filteredUserOrders() {
    return this.orders.filter(order => +order.created_by.id === +this.userID);
  }

  get maxOrdersForUser() {
    let countOrder = 0;
    this.filteredUserOrders.forEach(() => (countOrder += 1));
    return countOrder;
  }

  get orderItems() {
    let newOrder = [];
    this.orderList.forEach((order, index) => {
      prodID = +order.substr(0, 6);
      quantID = +order.substr(6, 6);
      priceID = +order.substr(12, 6);
      newOrder.push({
        prodID: prodID,
        quantID: quantID,
        priceID: priceID
      });
    });
    return newOrder;
  }

  get orderList() {
    let orderSNforOne = [];
    let indexVal;
    this.filteredUserOrders[this.selectedOrder].orderSerialNo.forEach(
      (SN, index) => {
        indexVal = this.orderSN.findIndex(serial => serial.id === SN.id);
        orderSNforOne.push(this.orderSN[indexVal].name);
      }
    );
    return orderSNforOne;
  }

  fetchOrderSNs() {
    return instance
      .get("api/order-serial-no/list/?format=json")
      .then(res => res.data)
      .then(
        order =>
          (this.orderSN = order.sort((a, b) => {
            if (a.id > b.id) return -1;
            else return 0;
          }))
      )
      .catch(err => console.error(err));
  }
}
decorate(OrdersStore, {
  orderSN: observable,
  orders: observable,
  userID: observable,
  selectedOrder: observable,
  filteredUserOrders: computed,
  maxOrdersForUser: computed,
  orderList: computed,
  orderItems: computed
});
const OrderStore = new OrdersStore();
OrderStore.fetchOrderSNs();
OrderStore.fetchOrderHistory();
export default OrderStore;
