<template>
  <div>
    <div class="spread mb-3">
      <div></div>
      <button @click="clear" class="btn-link">Tout supprimer</button>
    </div>

    <div v-if="filtered.length === 0" class="text-sm text-muted">Rien à afficher.</div>

    <div class="list">
      <HabitItem v-for="h in filtered" :key="h.id" :habit="h" class="card" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useHabitsStore } from "../stores/habits";
import HabitItem from "./HabitItem.vue";
const props = defineProps({ category: { type: String, default: "" } });
const store = useHabitsStore();


const filtered = computed(() =>
  props.category ? store.habits.filter(h => h.category === props.category) : store.habits
);
function clear(){ if (confirm("Supprimer toutes les habitudes ?")) store.clearAll(); }
</script>

<style scoped>
.list{ display:grid; gap:12px; }
</style>
