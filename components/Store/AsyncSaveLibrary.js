 saveCart(){
    AsyncStorage.setItem("cart", JSON.stringify(this.cart))
  }
  getCart(){
    AsyncStorage.getItem("cart").then(
      item => {
        if (item !== null){
          this.cart = JSON.parse(item)
        }
      }
    )
  }