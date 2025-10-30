<template>
  <div style="position:relative">
    <button class="btn" @click="open = !open">Panier ({{ count }})</button>

    <div v-if="open" class="drawer">
      <h3 style="margin:0 0 8px">Votre panier</h3>

      <div v-if="cart.length === 0" class="empty">Vide.</div>

      <ul v-else class="list">
        <li v-for="p in cart" :key="p.id" class="line">
          <div class="left">
            <span class="name">{{ p.name }}</span>
            <span class="price">{{ (p.price * p.qty).toFixed(2) }} €</span>
          </div>
          <div class="right">
            <input class="qty" type="number" min="1" :value="p.qty" @input="setQty(p.id, $event.target.value)" />
            <button class="btn-link" @click="remove(p.id)">✕</button>
          </div>
        </li>
      </ul>

      <div class="total">Total : <b>{{ total.toFixed(2) }} €</b></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCart } from '../composables/useCart'
const open = ref(false)
const { cart, total, remove, setQty, count } = useCart()
</script>

<style scoped>
.drawer { position:absolute; right:0; top:42px; background:#fff; border-radius:10px; box-shadow:0 8px 24px rgba(0,0,0,.12); padding:14px; min-width:320px; z-index:30; }
.empty { color:#64748b; font-size:.9rem; }
.list { list-style:none; padding:0; margin:0 0 10px; max-height:300px; overflow:auto; }
.line { display:flex; justify-content:space-between; align-items:center; gap:12px; padding:8px 0; border-bottom:1px solid #eef; }
.line:last-child { border-bottom:0; }
.left { display:flex; flex-direction:column; }
.name { font-weight:500; }
.price { color:#64748b; font-size:.9rem; }
.right { display:flex; align-items:center; gap:8px; }
.qty { width:56px; padding:6px; border:1px solid #e5e7eb; border-radius:8px; }
.total { text-align:right; margin-top:8px; }
</style>
