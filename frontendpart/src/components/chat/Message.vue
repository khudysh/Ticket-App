<template>
     


     <div v-if="item.from == this.userType" class="r">
        <div  class="owner">
            <p>{{ item.msg }}</p>
            <p style="color: rgb(173, 173, 173); font-size: 14px;">{{ item.time }}</p>
        </div>
        <div class="cr">{{ item.from[0] }}</div>
    </div>
    
    <div v-if="item.from != this.userType" class="l">
        <div class="cl">{{ item.from[0] }}</div>
        <div  class="nowner">
            <p>{{ item.msg }}</p>
            <p style="color: rgb(173, 173, 173); font-size: 14px;">{{ item.time }}</p>
        </div>
    </div>

       
</template>


<script lang="ts">
import { defineComponent } from 'vue'
 


export default defineComponent({
    name: 'Message',
    data() {
        return {
            userType: '' as string,
            
        }
    },
    props: {
        item: {
            type: Object,
            required:true
        }
    },
    mounted() {
        this.userType = localStorage.getItem("userType") ?? "user";
    },
})
</script>
<style>
    .owner {
        display: flex;
        flex-direction: column;
        align-items: end;
        color: white;
        background-color: #7B7B7B;
        width: max-content;
        padding: 10px 20px;
        border-radius: 11px;
        margin-right: 5px;

    }
    .r {
        margin-top: 10px;
        display: flex;
        justify-content: right;
    }
    .l {
        margin-top: 10px;
        display: flex;
        justify-content: left;
    }
    .cr {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        background-color: rgb(194, 192, 192);
    }
    .cl {
        margin-right: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        background-color: #bdcd9e;
    }
    .nowner {
        display: flex;
        flex-direction: column;
        align-items: start;
        border: 1.5px solid rgb(225, 225, 225);
        width: max-content;
        padding: 10px 20px;
        border-radius: 11px;
        margin-right: 5px;
    }
</style>