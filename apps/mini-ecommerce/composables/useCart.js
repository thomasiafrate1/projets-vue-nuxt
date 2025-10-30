import { ref, computed } from 'vue'

const cart = ref([])

export function useCart() {
  function addToCart(product) {
    const it = cart.value.find(p => p.id === product.id)
    if (it) it.qty++
    else cart.value.push({ ...product, qty: 1 })
  }
  function remove(id) {
    cart.value = cart.value.filter(p => p.id !== id)
  }
  function setQty(id, qty) {
    const it = cart.value.find(p => p.id === id)
    if (!it) return
    it.qty = Math.max(1, Number(qty) || 1)
  }
  const count = computed(() => cart.value.reduce((n, p) => n + p.qty, 0))
  const total = computed(() => cart.value.reduce((s, p) => s + p.price * p.qty, 0))

  return { cart, addToCart, remove, setQty, count, total }
}
