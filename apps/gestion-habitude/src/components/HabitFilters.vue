<template>
  <div class="text-sm">
    <label class="text-muted">Catégorie: </label>
    <select :value="modelValue" @change="$emit('update:category', $event.target.value)" class="select">
      <option value="">Toutes</option>
      <option v-for="c in cats" :key="c" :value="c">{{ c }}</option>
    </select>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useHabitsStore } from "../stores/habits";
defineProps({ modelValue: String });
defineEmits(["update:category"]);
const store = useHabitsStore();
const cats = computed(() => store.categories);
</script>
