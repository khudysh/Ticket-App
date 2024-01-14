<template>
    <div class="f">

        <input  @keypress.enter="sendMess" placeholder="Ваше сообщение" id="i1" type="text" v-model="msg">
        <v-btn @click="sendMess" class="btn" variant="tonal" style="background-color:#7B7B7B; color: white; height: 50px;">
            Отправить
        </v-btn>

    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Input',
    emits: ['add'],
    data() {
        return {
            msg: '' as string,
            empty: false,
            userType: '' as string,

        }
    },
    mounted() {
        this.userType = localStorage.getItem("userType") ?? "user";
    },
    methods: {
        sendMess: function() {
            let date = new Date();
            this.msg = this.msg.trim()
            if (this.msg == '') return
            this.$store.commit('sendMess', {
                id: Date.now(),
                msg: this.msg,
                from:this.userType,
                time: date.getHours() + ':' + date.getMinutes()
            })
            this.msg = ''
        },
    },
})
</script>
<style>
.f {
    height: max-content;
    width: 100%;
    display: flex;
    justify-content: space-between;

}

#i1 {
    height: 50px;
    border: 1.5px solid rgba(180, 201, 137, 1);
    padding: 0px 25px;
    border-radius: 3px;
    width: 95%;
    margin-right: 20px;
    outline: none;
}

.btn {
    height: 50px;
    border-radius: 3px;
    width: 100px;
    background-color: #7B7B7B;
    color: white;
}
</style>