<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-tabs v-model="tab" fixed-tabs>
                <v-tab>
                    Новый тикет
                </v-tab>
                <v-tab>
                    Мои тикеты
                </v-tab>
            </v-tabs>
        </v-row>
        <v-window v-model="tab" style="margin-top: 30px;  ">
            <v-window-item value="1">
                <v-col align="center">
                    <div class="newtform">
                        <div class="thm">
                            <label for="theme">Тема:</label>
                            <input id="th" type="text" name="theme" v-model="summary">
                        </div>
                        <span class="lbs">
                            <label for="probl">Опишите проблему:</label>
                            <div class="sel">
                                <v-select v-model="pr" density="compact"
                                    style="background-color: #7B7B7B; color: white; height: 45px; border-radius: 3px;"
                                    label="Приоритет" :items="['LOW', 'MED', 'HIGH']" id="ct"></v-select>
                            </div>
                        </span>
                        <textarea name="probl" id="pr" v-model="content"></textarea>
                        <v-btn @click="addTicket" variant="tonal"
                            style="width: 250px;background-color:#7B7B7B ;color: white; margin-top: 30px;">
                            Отправить
                        </v-btn>
                    </div>
                </v-col>
            </v-window-item>
            <v-window-item value="2">
                <template v-for="ticket in tickets" :key="ticket.id">
                    <v-col v-show="ticket.from == this.$store.state.UsersState.cur_user.login">
                        <TiketCard :ticket="ticket" />
                    </v-col>
                </template>
            </v-window-item>
        </v-window>
    </v-container>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'

import TiketCard from '@/components/home/TiketCard.vue'

export default defineComponent({
    name: 'UserHomeView',
    components: {
        TiketCard,
    },
    data() {
        return {
            tab: 0 as number,
            content: '' as string,
            summary: '' as string,
            pr: '' as string
        }
    },
    methods: {
        addTicket: function () {
            this.$store.dispatch('addTicket', {
                id: Date.now(),
                summary: this.summary,
                content: this.content,
                priority: this.pr,
                status: 'Created',
                create_date: new Date().toISOString(),
                update_date: new Date().toISOString(),
                from: this.$store.state.UsersState.cur_user.login,
                answ: ''
            })
            this.summary = ''
            this.content = ''
            this.pr = ''
        }
    },
    computed: {
        tickets: function () {
            return this.$store.state.TicketState.tickets
        }
    },
    async mounted() {
        await this.$store.dispatch('getUserInfo')
        await this.$store.dispatch('getUserTickets', this.$store.state.UsersState.cur_user.login)
    },
})
</script>
<style>
.newtform {
    margin-top: 20px;
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#th {
    height: 45px;
    border: 1.5px solid rgba(180, 201, 137, 1);
    padding: 0px 25px;
    border-radius: 3px;
    width: 100%;
    outline: none;
}

#pr {
    height: 300px;
    border: 1.5px solid rgba(180, 201, 137, 1);
    padding: 20px 25px;
    border-radius: 3px;
    width: 100%;
    outline: none;
}

#ct {
    width: 300px;
}

.lbs {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 50px;
}

.sel {
    width: 150px;
    margin-bottom: 5px;

}

.thm {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
}
</style>