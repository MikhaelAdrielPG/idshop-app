<template>
  <div id="app" class="container mt-5">
    <h1>IDShop</h1>
    <p class="animated fadeInRight">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium
      magnam necessitatibus quod ipsam nemo labore a expedita, dolorem minima
      repellendus? Iusto similique quas ex autem distinctio blanditiis odio
      necessitatibus sunt!
    </p>
    <font-awesome-icon icon="shopping-cart"></font-awesome-icon>
    <price :value="4.23"></price>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Price from './components/Price.vue'

export default {
  name: 'app',
  components: {
    FontAwesomeIcon,
    Price,
  },
}
</script>
