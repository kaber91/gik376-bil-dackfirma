<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="app">
    <nav class="navbar">
      <RouterLink to="/">Hem</RouterLink>
      <RouterLink to="/boka-service">Boka Service</RouterLink>
      <RouterLink to="/bokningar">Mina Bokningar</RouterLink>
      <RouterLink to="/om-oss">Om Oss</RouterLink>
    </nav>

    <main class="container">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #222;
}
.navbar a {
  color: white;
  text-decoration: none;
}
.navbar a.router-link-active {
  text-decoration: underline;
}

.container {
  max-width: 960px;
  margin: 2rem auto;
  padding: 0 1rem;
}
</style>

