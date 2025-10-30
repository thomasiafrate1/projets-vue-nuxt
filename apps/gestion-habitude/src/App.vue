<template>
  <div>
    <header class="header">
      <div class="header-inner">
        <h1>Gestionnaire d'Habitudes</h1>
        <a href="/" class="btn" style="background:#475569;padding:6px 10px;border-radius:8px;color:#fff;text-decoration:none">← Retour aux projets</a>

      </div>
    </header>

    <main class="container">
      <section class="card">
        <HabitForm />
      </section>

      <section class="card">
        <div class="spread mb-3">
          <h2>Mes habitudes</h2>
          <HabitFilters v-model:category="category" />
        </div>
        <HabitList :category="category" />
      </section>

      <section class="card">
        <WeeklyStats />
      </section>
    </main>
  </div>
</template>

<script setup>
import HabitForm from "./components/HabitForm.vue";
import HabitList from "./components/HabitList.vue";
import HabitFilters from "./components/HabitFilters.vue";
import WeeklyStats from "./components/WeeklyStats.vue";
import { ref, onMounted } from "vue";
import { useHabitsStore } from "./stores/habits";

const store = useHabitsStore();

onMounted(() => {
  store.$subscribe((_mutation, state) => {
    localStorage.setItem("habit-tracker.v1", JSON.stringify(state));
  });
});

const category = ref("");
</script>
