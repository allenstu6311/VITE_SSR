<template>
  <h1>Home</h1>
  <img :src="vueSvg" alt="" />
  <!-- <img src="../assets/vue.svg" alt="" /> -->
</template>
<script setup>
import { computed, ref, onMounted } from "vue";
import vueSvg from "@/assets/vue.svg";
// import { createHash } from "crypto";

// onMounted(() => {
//   const md5 = createHash("md5");
//   console.log(md5);
// });

// const image = import.meta.glob("@/assets/**/*.svg");
// console.log(image);
// console.log("import.meta.url", import.meta.url);

const imageUrl = computed(() => {
  return new URL(`./${pic.value}.svg`, import.meta.url).href;
});
</script>
