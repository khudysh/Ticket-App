<template>
    <v-container>
        <v-row align="center" justify="center">
            <v-tabs v-model="tab" fixed-tabs>
                <v-tab value="1">
                    Активные
                </v-tab>
                <v-tab value="2">
                    Закрытые
                </v-tab>
            </v-tabs>
        </v-row>
        <v-window v-model="tab" style="margin-top: 30px;">
            <v-window-item value="1">
                <template v-for="ticket in tickets" :key="ticket.id">
                    <v-col v-show="ticket.status == 'Created' || ticket.status == 'Working'">
                        <TiketCard :ticket="ticket" />
                    </v-col>
                </template>

            </v-window-item>
            <v-window-item value="2">
                <template v-for="ticket in tickets" :key="ticket.id">
                    <v-col v-show="ticket.status == 'Done'">
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
    name: 'AdminHomeView',
    components: {
        TiketCard
    },
    data() {
        return {
            tab: 0 as number
        }
    },
    methods: {
        update: function (id: string, status: string, answ: string, updateD: string) {
            this.$emit("update", id, status, answ, updateD);
        },
    },
    computed: {
        tickets: function () {
            return this.$store.state.TicketState.tickets
        }
    },
    async mounted() {
        await this.$store.dispatch('getUserInfo')
        if (this.$store.state.TicketState.tickets.length < 1) {
            await this.$store.dispatch('getAllTickets')
        }
        
    },
})
</script>
<style>
.v-row {
    display: flex;
    justify-content: center;
}

.cards {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;

}
</style>