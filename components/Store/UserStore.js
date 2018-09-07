import { decorate, observable, computed, action } from "mobx";
import axios from "axios";

//Import Stores
import newProduct from "./AddProduct";

const instance = axios.create({
  baseURL: "http://178.128.202.231"
});

class UsersStore {
  constructor() {
    this.users = [];
    this.userQuery = "";
  }

  userSearch(value) {
    this.userQuery = value;
    console.log(this.userQuery);
  }
  fetchUsers() {
    return instance
      .get("api/users/list/?format=json")
      .then(res => res.data)
      .then(user => (this.users = user))
      .catch(err => console.error(err));
  }

  get filteredUsers() {
    return this.users.filter(tag =>
      `${tag.first_name} ${tag.last_name} ${tag.email} ${tag.username}`
        .toLowerCase()
        .includes(this.userQuery.toLowerCase())
    );
  }
}

decorate(UsersStore, {
  users: observable,
  userQuery: observable,
  filteredUsers: computed
});
const UserStore = new UsersStore();
UserStore.fetchUsers();

export default UserStore;
