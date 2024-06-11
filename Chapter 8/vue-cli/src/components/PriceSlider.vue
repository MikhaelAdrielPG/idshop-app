<template>
  <transition name="fade">
    <div v-if="sliderStatus">
      <div class="align-items-center" :class="sliderState">
        <label for="maxAmountInput" class="font-weight-bold mr-2">Max</label>
        <input
          id="maxAmountInput"
          type="number"
          class="form-control mx-2"
          style="width: 60px; text-align: center"
          v-model="maxAmount"
          @change="$emit('update:maximum', maxAmount)"
        />
        <input
          id="maxAmountRange"
          type="range"
          class="custom-range w-100"
          min="0"
          max="200"
          v-model="maxAmount"
          @input="$emit('update:maximum', maxAmount)"
        />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'price-slider',
  data: function () {
    return {
      maxAmount: this.maximum || 50, // Inisialisasi maxAmount dengan nilai maximum
    }
  },
  props: ['sliderStatus', 'maximum'],
  watch: {
    maximum(newVal) {
      this.maxAmount = newVal // Perbarui maxAmount jika prop maximum berubah
    },
  },
  computed: {
    sliderState: function () {
      return this.sliderStatus ? 'd-flex' : 'd-none'
    },
  },
}
</script>

<style>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 3s ease-in-out;
}
</style>
