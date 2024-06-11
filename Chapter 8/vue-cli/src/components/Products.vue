<template>
  <div>
    <navbar
      :cart="cart"
      :cartQty="cartQty"
      :cartTotal="cartTotal"
      @toggle-slide="toggleSlider"
      @delete-item="deleteItem"
    ></navbar>
    <product-list
      :maximum="maximum"
      :products="products"
      @add-item="addItem"
    ></product-list>
  </div>
</template>

<script>
import ProductList from './ProductList.vue'
import Navbar from './Navbar.vue'

export default {
  name: 'products-component',
  props: [
    'products',
    'maximum',
    'cart',
    'cartQty',
    'cartTotal',
    'sliderStatus',
    'sliderState',
  ],
  components: {
    Navbar,
    ProductList,
  },
  methods: {
    toggleSlider: function () {
      this.$emit('toggle')
    },
    addItem: function (item) {
      this.$emit('add', item)
    },
    deleteItem: function (index) {
      this.$emit('delete', index)
    },
  },
}
</script>
