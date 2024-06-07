<template>
  <div>
    <h1>Checkout</h1>
    <table class="table table-hover" v-if="cart.length">
      <caption class="text-end h3">
        <b>Total:</b>
        <price
          class="d-block text-success font-weight-light"
          :value="Number(cartTotal)"
        ></price>
      </caption>
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">Item</th>
          <th scope="col" class="text-center">Qty</th>
          <th scope="col" class="text-end">Price</th>
          <th scope="col" class="text-end">Sub-total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in cart" :key="item.product.id">
          <td class="text-center">
            <div class="btn-group">
              <button @click="$emit('add', item.product)" class="btn btn-info">
                +
              </button>
              <button
                @click="$emit('delete', index)"
                class="btn btn-outline-info"
              >
                -
              </button>
            </div>
          </td>
          <th scope="row">{{ item.product.name }}</th>
          <td class="text-center">{{ item.qty }}</td>
          <td class="text-end">{{ Number(item.product.price) }}</td>
          <td class="text-end">
            {{ Number(item.product.price * item.qty) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Price from './Price.vue'

export default {
  name: 'CheckoutComponent',
  props: ['cart', 'cartTotal'],
  components: {
    Price,
  },
}
</script>
