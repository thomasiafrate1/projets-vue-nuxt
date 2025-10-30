<template>
  <NuxtPage />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

:root { --text:#1e293b; --muted:#64748b; --card:#fff; }

html, body { height:100%; margin:0; }
body {
  font-family: 'Poppins', system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, sans-serif;
  color: var(--text);
  background: linear-gradient(135deg, #f8fafc, #f8d2d2ff , #f1b5e2ff);
    background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* utilitaires */
.container { max-width:1100px; margin:0 auto; padding:24px; }
.grid { display:grid; gap:24px; }
@media (min-width: 900px) { .grid-cols-3 { grid-template-columns: repeat(3, 1fr); } }

.card { background: var(--card); border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,.06); padding: 12px; }
.btn { background:#111827; color:#fff; border:0; padding:8px 12px; border-radius:8px; cursor:pointer; }
.btn:hover { opacity:.92; }
.btn-link { background:none; border:0; color:#c0392b; cursor:pointer; }
.input { width:100%; border:1px solid #e5e7eb; border-radius:8px; padding:10px 12px; }
.badge { font-size:.8rem; color:var(--muted); }
.header { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; }
</style>
