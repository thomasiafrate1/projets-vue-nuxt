<template>
  <div class="container">
    <div style="margin-bottom:12px">
      <a href="/" class="btn" style="background:#475569">← Retour aux projets</a>
    </div>
    <header class="header">
      <h1>Mini e-commerce</h1>
      <CartDrawer />
    </header>

    <SearchBar
      v-model="search"
      :category="category"
      :sort="sort"
      :categories="categories"
      @update:category="category = $event"
      @update:sort="sort = $event"
    />

    <ProductList :products="visible" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRuntimeConfig } from '#imports'
import SearchBar from '../../components/SearchBar.vue'
import ProductList from '../../components/ProductList.vue'
import CartDrawer from '../../components/CartDrawer.vue'

const products = ref([])
const search = ref('')
const category = ref('')
const sort = ref('')

onMounted(async () => {
  const base = useRuntimeConfig().app.baseURL || '/'
  const res = await fetch(base + 'products.json')
  products.value = await res.json()
})
const categories = computed(() =>
  Array.from(new Set(products.value.map(p => p.category)))
)

const filtered = computed(() => {
  let out = products.value.filter(p =>
    p.name.toLowerCase().includes(search.value.toLowerCase()) &&
    (!category.value || p.category === category.value)
  )
  switch (sort.value) {
    case 'price-asc': out = out.sort((a,b)=>a.price-b.price); break
    case 'price-desc': out = out.sort((a,b)=>b.price-a.price); break
    case 'name-asc': out = out.sort((a,b)=>a.name.localeCompare(b.name)); break
    case 'name-desc': out = out.sort((a,b)=>b.name.localeCompare(a.name)); break
  }
  return out
})

const visible = computed(() => filtered.value)
</script>
