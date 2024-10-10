<script setup>
import CHeader from "./components/CHeader.vue";
import HelloWorld from "./components/HelloWorld.vue";
import { onMounted } from "vue";
</script>

<template>
  <CHeader />
  <router-view></router-view>
  <img src="/vite.svg" alt="" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
