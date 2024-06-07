<template>
  <div id="app" class="container mt-5">
    <CheckoutComponent
      :cart="cart"
      :cartTotal="cartTotal"
      @add="addItem"
      @delete="deleteItem"
    ></CheckoutComponent>
    <products
      :cart="cart"
      :cartQty="cartQty"
      :cartTotal="cartTotal"
      :maximum.sync="maximum"
      :products="products"
      :sliderStatus="sliderStatus"
      @toggle="toggleSliderStatus"
      @add="addItem"
      @delete="deleteItem"
    >
    </products>
  </div>
</template>

<script>
import Vue from 'vue'
import CheckoutComponent from './components/Checkout.vue'
import Products from './components/Products.vue'

export default {
  name: 'app',
  data() {
    return {
      maximum: 50,
      products: [],
      cart: [],
      style: {
        sliderStatus: false,
      },
    }
  },
  components: {
    CheckoutComponent,
    Products,
  },
  mounted: function () {
    fetch('https://hplussport.com/api/products/order/price')
      .then((response) => response.json())
      .then((data) => {
        this.products = data
      })
  },
  computed: {
    cartTotal: function () {
      let sum = 0
      for (let key in this.cart) {
        sum = sum + this.cart[key].product.price * this.cart[key].qty
      }
      return sum
    },
    cartQty: function () {
      let qty = 0
      for (let key in this.cart) {
        qty = qty + this.cart[key].qty
      }
      return qty
    },
  },
  methods: {
    toggleSliderStatus() {
      this.style.sliderStatus = !this.style.sliderStatus
    },
    addItem(product) {
      const item = this.cart.find((item) => item.product.id === product.id)
      if (item) {
        item.qty++
      } else {
        this.cart.push({ product, qty: 1 })
      }
    },
    deleteItem(index) {
      if (this.cart[index].qty > 1) {
        Vue.set(this.cart, index, {
          ...this.cart[index],
          qty: this.cart[index].qty - 1,
        })
      } else {
        this.cart.splice(index, 1)
      }
    },
  },
}
</script>
