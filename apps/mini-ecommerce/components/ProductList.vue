<template>
  <div class="grid grid-cols-3">
    <ProductCard v-for="p in products" :key="p.id" :product="p" />
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'
defineProps({ products: { type: Array, default: () => [] } })
</script>
