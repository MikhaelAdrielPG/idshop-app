<template>
  <nav class="navbar navbar-light fixed-top">
    <div class="container-fluid d-flex justify-content-end">
      <!-- Tombol Toggle -->
      <button
        class="btn btn-sm btn-outline-success me-2"
        @click="$emit('toggle-slide')"
      >
        <font-awesome-icon icon="dollar-sign" />
      </button>

      <!-- Dropdown Cart -->
      <div class="dropdown" v-if="cart.length > 0">
        <button
          class="btn btn-success btn-sm dropdown-toggle"
          id="dropdownCart"
          @click="toggleDropdown"
          aria-haspopup="true"
          :aria-expanded="dropdownOpen.toString()"
        >
          <span class="badge badge-pill badge-light">{{ cartQty }}</span>
          <font-awesome-icon
            icon="shopping-cart"
            class="fas fa-shopping-cart mx-2"
          />
          <price :value="Number(cartTotal)" />
        </button>
        <div
          class="dropdown-menu dropdown-menu-right"
          :class="{ show: dropdownOpen }"
          aria-labelledby="dropdownCart"
        >
          <div v-for="(item, index) in cart" :key="index">
            <div class="dropdown-item-text text-nowrap text-right">
              <span
                class="badge rounded-pill bg-warning text-dark align-text-top mx-1"
                >{{ item.qty }}</span
              >
              <span>{{ item.product.name }}</span>
              <b class="mx-2">{{
                (item.qty * item.product.price) | currencyFormat
              }}</b>
              <button
                class="btn badge bg-danger"
                @click.stop="deleteItem(index)"
              >
                -
              </button>
            </div>
          </div>
          <router-link
            class="btn btn-sm btn-outline-info text-dark float-end mr-2"
            to="/checkout"
            >Checkout</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Price from './Price.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'navbar-component',
  props: ['cart', 'cartQty', 'cartTotal'],
  data() {
    return {
      dropdownOpen: false,
    }
  },
  components: {
    Price,
    FontAwesomeIcon,
  },
  filters: {
    currencyFormat(value) {
      return 'Rp' + Number.parseFloat(value).toFixed(2)
    },
  },
  computed: {
    showDropdown() {
      return this.cart.length > 0
    },
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen
    },
    deleteItem(index) {
      this.$emit('delete-item', index)
    },
  },
}
</script>

<style scoped>
.dropdown-menu-right.show {
  right: 0;
}
</style>
