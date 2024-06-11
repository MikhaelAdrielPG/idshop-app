<template>
  <div id="app" class="container mt-5">
    <h1>Shopme</h1>
    <price-slider
      :sliderStatus="sliderStatus"
      :maximum.sync="maximum"
    ></price-slider>
    <router-view
      :cart="cart"
      :cartQty="cartQty"
      :cartTotal="cartTotal"
      :maximum.sync="maximum"
      :products="filteredProducts"
      :sliderStatus="sliderStatus"
      @toggle="toggleSliderStatus"
      @add="addItem"
      @delete="deleteItem"
    ></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import PriceSlider from './components/PriceSlider.vue'

export default {
  name: 'app',
  components: {
    PriceSlider,
  },
  data() {
    return {
      maximum: 50,
      products: [],
      cart: [],
      sliderStatus: true,
    }
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
    filteredProducts() {
      if (this.sliderStatus) {
        return this.products.filter((product) => product.price <= this.maximum)
      }
      return this.products
    },
  },
  methods: {
    toggleSliderStatus() {
      this.sliderStatus = !this.sliderStatus
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
