<template>
  <div>
    <div class="spread">
      <div>
        <p class="font-semibold">{{ habit.name }}</p>
        <p class="text-sm text-muted">{{ habit.category }}</p>
      </div>
      <button @click="remove" class="btn-link">Supprimer</button>
    </div>

    <div class="mt-3 grid-7">
      <label v-for="d in last7" :key="d.value" class="day">
        <input type="checkbox" class="checkbox" :checked="isDone(d.value)" @change="toggle(d.value)" />
        <span class="mt-2">{{ d.label }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useHabitsStore } from "../stores/habits";
const props = defineProps({ habit: { type: Object, required: true } });
const store = useHabitsStore();

function toISO(date){ return date.toISOString().slice(0,10); }

const last7 = computed(() => {
  const arr = []; const base = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(base); d.setDate(base.getDate() - i);
    arr.push({ value: toISO(d), label: d.toLocaleDateString(undefined, { weekday: "short" }) });
  }
  return arr;
});

function isDone(dayISO){ return props.habit.logs.includes(dayISO); }
function toggle(dayISO){ store.toggleDone(props.habit.id, dayISO); }
function remove(){ store.removeHabit(props.habit.id); }
</script>

<style scoped>
.font-semibold{ font-weight:600 }
</style>
