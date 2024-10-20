<template>
  <h1>Home</h1>
  <img :src="vueSvg" alt="" />
  <img :src="bg" alt="" />
  <!-- <img src="../assets/vue.svg" alt="" /> -->
</template>
<script setup>
import { computed, ref, onMounted } from "vue";
import vueSvg from "@/assets/vue.svg";
import bg from "@/assets/image/bg.jpg";
// import crypto from 'crypto'

// console.log('crypto',crypto);


let crypto;
if(!import.meta.env.SSR){
  import('crypto').then((module=>{
    crypto = module;
    console.log('import',crypto.default);
  }))
}


onMounted(() => {
  console.log('process',process);

  // console.log(crypto);
  // const md5 = crypto.createHash("md5");
  // console.log(md5);
});

// const image = import.meta.glob("@/assets/**/*.svg");
// console.log(image);
// console.log("import.meta.url", import.meta.url);

const imageUrl = computed(() => {
  return new URL(`./${pic.value}.svg`, import.meta.url).href;
});
</script>
