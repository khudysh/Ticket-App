import ChatMessage from "@/components/chat/ChatInterface"


const ChatState = {
    state: {
        chat: JSON.parse(localStorage.getItem('chat') as string) ?? [] as Array<ChatMessage>
    },
    getters: {
    },
    mutations: {
        sendMess: function (state: any, payload: ChatMessage) {
            
            if(state.chat.length >= 4) {
                state.chat.shift()
            }
            state.chat.push(payload);
            this.commit('testReply')
            this.commit('saveLC')
        },
        testReply: function (state: any) {
            let date = new Date();
            state.chat.push({
                id: Date.now(),
                msg: 'Test message',
                from: 'Tester',
                time: date.getHours() + ':' + date.getMinutes()
            })

        },
        saveLC: function (state: any) {
            localStorage.setItem("chat", JSON.stringify(state.chat));
        }
    },
    actions: {
    },
    modules: {

    }
}

export default ChatState
