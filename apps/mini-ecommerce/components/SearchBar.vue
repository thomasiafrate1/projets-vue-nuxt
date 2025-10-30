<template>
  <div style="display:flex; gap:12px; align-items:center; margin-bottom:16px">
    <input
      class="input"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Rechercher un produit…"
      style="flex:1"
    />
    <select class="input" style="max-width:220px" :value="category" @change="$emit('update:category', $event.target.value)">
      <option value="">Toutes catégories</option>
      <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
    </select>
    <select class="input" style="max-width:180px" :value="sort" @change="$emit('update:sort', $event.target.value)">
      <option value="">Tri: défaut</option>
      <option value="price-asc">Prix ↑</option>
      <option value="price-desc">Prix ↓</option>
      <option value="name-asc">Nom A→Z</option>
      <option value="name-desc">Nom Z→A</option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  category: String,
  sort: String,
  categories: Array
})
defineEmits(['update:modelValue', 'update:category', 'update:sort'])
</script>
