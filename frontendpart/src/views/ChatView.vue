<template >
    <div class="chat-wrap">
        <div class="chat">
            <template v-for="item in chat" :key="item.id">
                <Message :item="item" />
            </template>
        </div>

        <Input />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Input from '@/components/chat/Input.vue'
import Message from '@/components/chat/Message.vue'

export default defineComponent({
    name: 'ChatView',
    components: {
        Input, Message,
    },
    mounted() {
    },
    data() {
        return {
        }
    },
    methods: {
    },
    computed: {
        chat: function () {
            return this.$store.state.ChatState.chat
        }
    }
})
</script>
<style>
.chat-wrap {
    margin: 0 30px;
    display: flex;
    flex-direction: column;
    justify-content: end;
    width: 100%;
    height: 90vh;
}

.chat {
    height: 100%;
    overflow-y: auto;
}
</style>