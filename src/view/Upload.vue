<template>
    <h1>upload</h1>
    <input type="file" name="" id="" @change="fileChange">
    <button @click="submit">submit</button>
    <button @click="getImage">getImage</button>
    <img :src="imageSrc" alt="">
</template>
<script setup>
import $http from '../api/api';
import { ref,onMounted } from 'vue';


const file = ref('');
const imageSrc = ref('')

function fileChange($event){
    console.log($event.target.files);
    file.value = $event.target.files[0];
}

function submit(){
    const formData = new FormData();
    formData.append('file',file.value)
    formData.append('fileName',file.value.name)
    $http.post("/uploadFile",formData)
    .then((res)=>{
        console.log('submit',res);
    })
}

function getImage(){
    $http.get("/preview",{
        params:{
            index:0
        },
        responseType:'blob'
    })
    .then((res)=>{
        const imageUrl = URL.createObjectURL(res.data); 
        imageSrc.value = imageUrl;
    })
}


</script>