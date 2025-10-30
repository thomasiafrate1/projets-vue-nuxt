<template>
  <div class="card">
    <NuxtLink :to="`/product/${product.id}`">
      <img :src="product.image" :alt="product.name" class="thumb" />
    </NuxtLink>
    <h3 class="name">{{ product.name }}</h3>
    <p class="badge">{{ product.category }}</p>
    <div class="row">
      <span class="price">{{ product.price.toFixed(2) }} €</span>
      <button class="btn" @click="addToCart(product)">Ajouter</button>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '../composables/useCart'
defineProps({ product: Object })
const { addToCart } = useCart()
</script>

<style scoped>
.card { overflow: hidden; }
.thumb {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: contain;
  background: #fff;
  border-radius: 8px;
  padding: 8px;
  box-sizing: border-box;
}
.name { margin:10px 0 2px; font-size:1rem; font-weight:600; }
.row { display:flex; justify-content:space-between; align-items:center; margin-top:8px; }
.price { font-weight:600; }
</style>

