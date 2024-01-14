<template lang="">
    <div class='preload'>
        <h1>Загрузка...</h1>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: 'preLoader',
})
</script>
<style>
.preload {
    z-index: 1000;
    height:100vh;
    width:100%;
    background-color: rgb(127, 204, 127);
    display: flex;
    align-items:center;
    justify-content:center;
    position: fixed;
    top: 0;
    left: 0;
}  
</style>