<template>
  <div>
    <h2 class="mb-3">Statistiques (7 derniers jours)</h2>
    <div style="height:240px">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import { useHabitsStore } from "../stores/habits";
import { Chart } from "chart.js/auto";

const store = useHabitsStore();
const canvas = ref();
let chart;

function toISO(date){ return date.toISOString().slice(0,10); }
function last7Days(){
  const labels = []; const base = new Date();
  for(let i=6;i>=0;i--){
    const d = new Date(base); d.setDate(base.getDate()-i);
    labels.push({ iso: toISO(d), label: d.toLocaleDateString(undefined, { weekday:"short" }) });
  }
  return labels;
}

function compute(){
  const days = last7Days();
  const counts = days.map(day =>
    store.habits.reduce((acc, h) => acc + (h.logs.includes(day.iso) ? 1 : 0), 0)
  );
  return { labels: days.map(d=>d.label), counts };
}

function render(){
  const { labels, counts } = compute();
  if(chart) chart.destroy();
  chart = new Chart(canvas.value.getContext("2d"), {
    type: "bar",
    data: { labels, datasets: [{ label: "Habitudes complétées", data: counts }] },
    options: { responsive:true, maintainAspectRatio:false, scales:{ y:{ beginAtZero:true, ticks:{ precision:0 }}}}
  });
}

onMounted(render);
onBeforeUnmount(()=> chart && chart.destroy());
watch(()=> store.habits, render, { deep:true });
</script>
