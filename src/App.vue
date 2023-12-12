<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="logo1" class="logo" src="@/assets/logo.jpeg" width="80" height="80" />

    <img alt="logo2" class="logo" src="@/assets/logo2.jpeg" width="80" height="90" />

    <div class="wrapper">

      
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  place-items: center;
  padding-right: calc(var(--section-gap) / 2);
  padding-left: calc(var(--section-gap) / 2);
  line-height: 1.5;
  max-height: 10vh;
  box-shadow:
  0px 0.3px 0.5px rgba(0, 0, 0, 0.01),
  0px 0.8px 1.5px rgba(0, 0, 0, 0.015),
  0px 1.8px 3.6px rgba(0, 0, 0, 0.02),
  0px 6px 12px rgba(0, 0, 0, 0.03)
;
}

.logo {
  display: block;
  margin: 0 2rem 0 0;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
