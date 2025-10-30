import { defineStore } from "pinia";

const STORAGE_KEY = "habit-tracker.v1";

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { habits: [] };
  } catch {
    return { habits: [] };
  }
}

export const useHabitsStore = defineStore("habits", {
  state: () => ({
    habits: load().habits
  }),
  getters: {
    categories: s => [...new Set(s.habits.map(h => h.category).filter(Boolean))]
  },
  actions: {
    addHabit({ name, category }) {
      const id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
      this.habits.push({
        id,
        name: name.trim(),
        category: (category || "Général").trim(),
        logs: []
      });
    },
    removeHabit(id) {
      this.habits = this.habits.filter(h => h.id !== id);
    },
    toggleDone(id, day) {
      const h = this.habits.find(x => x.id === id);
      if (!h) return;
      const i = h.logs.indexOf(day);
      if (i >= 0) h.logs.splice(i, 1);
      else h.logs.push(day);
    },
    clearAll() {
      this.habits = [];
    }
  }
});
