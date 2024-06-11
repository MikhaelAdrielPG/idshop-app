<template>
  <div id="app" class="container">
    <h1>IDShop</h1>
    <navbar
      :cart="cart"
      :cartQty="cartQty"
      :cartTotal="cartTotal"
      @toggle="toggleSliderStatus"
      @delete="deleteItem"
    ></navbar>
    <price-slider
      :sliderStatus="style.sliderStatus"
      :maximum.sync="maximum"
    ></price-slider>
    <product-list
      :maximum="maximum"
      :products="products"
      @add="addItem"
    ></product-list>
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue'
import PriceSlider from './components/PriceSlider.vue'
import Navbar from './components/Navbar.vue'
import Vue from 'vue'

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
    ProductList,
    PriceSlider,
    Navbar,
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
