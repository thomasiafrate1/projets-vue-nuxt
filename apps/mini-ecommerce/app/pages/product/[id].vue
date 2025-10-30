<template>
  <div class="container" v-if="product">
    <NuxtLink to="/" class="btn" style="background:#475569;margin-bottom:12px">← Retour</NuxtLink>
    <div class="grid" style="grid-template-columns:1fr; gap:24px">
      <div class="image-box">
        <img
          :src="product.image.startsWith('http') ? product.image : '/' + product.image"
          :alt="product.name"
          class="product-image"
        />
      </div>

      <div class="card">
        <h1 style="margin:0 0 8px">{{ product.name }}</h1>
        <p class="badge">{{ product.category }}</p>
        <p style="margin:10px 0">{{ product.description }}</p>
        <div style="display:flex; align-items:center; justify-content:space-between; margin-top:12px">
          <span style="font-size:1.2rem; font-weight:600">{{ product.price.toFixed(2) }} €</span>
          <button class="btn" @click="addToCart(product)">Ajouter au panier</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container"><p>Produit introuvable.</p></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCart } from '../../../composables/useCart'
import { useRuntimeConfig } from '#imports'

const route = useRoute()
const { addToCart } = useCart()
const product = ref(null)

onMounted(async () => {
  const base = useRuntimeConfig().app.baseURL || '/'
  const res = await fetch(base + 'products.json')
  const list = await res.json()
  product.value = list.find(p => String(p.id) === String(route.params.id))
})
</script>

<style scoped>
.image-box {
  display: flex;
  justify-content: center;
}

.product-image {
  width: 500px;
  max-width: 720px;
  border-radius: 12px;
  object-fit: cover;
  border: 2px solid #000;
  background: #fff;
  padding: 8px;
  box-sizing: border-box;
}
</style>
