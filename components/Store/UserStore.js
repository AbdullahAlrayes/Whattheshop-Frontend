import { decorate, observable, computed, action } from "mobx";
import axios from "axios";

//Import Stores
import newProduct from "./AddProduct";
import authStore from "./authStore";

const instance = axios.create({
  baseURL: "http://178.128.202.231"
});

class UsersStore {
  constructor() {
    this.users = [];
    this.userQuery = "";
    this.signedInUser = {};
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

  updateUserDetails(username, firstname, lastname, email, userid) {
    let indexVal = this.users.findIndex(user => user.id === userid);

    return instance
      .post("api/users/" + indexVal)
      .then(res => res.data)
      .then(res => alert("User Information Updated"))
      .then(res => this.fetchUsers())
      .catch(err => console.log(err.response));
  }

  fetchUserByID(userID) {
    this.users.find(user => user.id === userID);
  }

  get currentUser() {
    if (this.signedInUser === {}) {
      return null;
    }
    // } else {
    //   let indexVal = this.user.findIndex(
    //     user => +user.id === +this.signedInUser.user_id
    //   );
    //   let thisUser = this.user[indexVal];
    //   return thisUser;
    // }
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
  filteredUsers: computed,
  currentUser: computed
});
const UserStore = new UsersStore();
UserStore.fetchUsers();

export default UserStore;
