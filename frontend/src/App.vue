<template>
  <div id="app">
    <Navbar />
    <RouterView />
  </div>
</template>

<script setup>
import Navbar from './v3/navbar.vue'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
