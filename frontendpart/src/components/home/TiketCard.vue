<template>
    <v-card flat @click="dialog = true" variant="elevated">
        <span v-if="ticket.status == 'Done'" class="solv">ВЫПОЛНЕН</span>
        <span v-if="ticket.status == 'Created'" class="ct">СОЗДАН</span>
        <span v-if="ticket.status == 'Working'" class="ctWork">В РАБОТЕ</span>
        <!-- <span v-if="ticket.status != 'DONE'" class="ct">{{ ticket.status }}</span> -->
        <span v-if="ticket.priority == 'MED'" class="prM">СРЕДНИЙ</span>
        <span v-if="ticket.priority == 'HIGH'" class="prH">ВАЖНЫЙ</span>
        <span v-if="ticket.priority == 'LOW'" class="prL">НИЗКИЙ</span>
        <div class="bb">
            <!-- <v-card-item style="width: 120px;">
                    <div class="ni">
                        <p class="p1">id: {{ ticket.id }}</p>
                        <p class="p1">from: {{ ticket.from }}</p>
                    </div>
            </v-card-item> -->
            <v-card-item>
                <div class="div2" style="margin-right: 10px">
                    <div class="ni">
                        <p class="p1">
                            <b style="font-size: 18px"> {{ ticket.summary }}</b>
                        </p>
                        <p class="hid">
                            {{ ticket.content }}
                        </p>
                    </div>
                </div>
            </v-card-item>
            <v-card-item>
            <div class="div3"  >
                <p class="hid">{{ ticket.create_date }}</p>
            </div>
        </v-card-item>
        </div>


        

        <TiketPopout :dialog="dialog" @close="close" :ticket="ticket" @update="update" />
    </v-card>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import TiketPopout from '@/components/home/TiketPopout.vue'

export default defineComponent({
    name: "TicketCard",
    components: {
        TiketPopout
    },
    props: {
        ticket: {
            type: Object,
            default: {},
            required: true
        },
    },
    data() {
        return {
            color: "indigo",
            dialog: false,
        }
    },
    mounted() {
        this.checkPriority();
    },
    methods: {
        checkPriority: function () {
            if (this.ticket.priority == "LOW") {
                this.color = "teal"
            } else if (this.ticket.priority == "MED") {
                this.color = "amber"
            } else if (this.ticket.priority == "HIGH") {
                this.color = "deep-orange"
            } else {
                this.color = "indigo"
            }
        },
        close() {
            this.dialog = false
        },
        update: function (id: string, status: string, answ: string, updateD: string) {
            this.$emit("update", id, status, answ, updateD);
        },
    },
});
</script>
<style>
.bb {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.ov {
    background-color: white;
    width: 749px;
    height: 645px;
}

.prM {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    background-color: #ffb649;
    border-radius: 0 0 5px 5px;
    position: absolute;
    top: 0;
    right: 400px;
}

.prH {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    background-color: #ff6749;
    border-radius: 0 0 5px 5px;
    position: absolute;
    top: 0;
    right: 400px;
}

.prL {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    background-color: rgb(162, 224, 255);
    border-radius: 0 0 5px 5px;
    position: absolute;
    top: 0;
    right: 400px;
}

.ct {
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    background-color: #cfff6b;
    border-radius: 0 0 5px 5px;
    position: absolute;
    top: 0;
    right: 100px;
}

.ctWork {
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    background-color: #aeff00;
    border-radius: 0 0 5px 5px;
    position: absolute;
    top: 0;
    right: 100px;
}

.div1,
.div2,
.div3 {
    height: 100%;
    padding: 10px;
}

.solv {
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 120px;
    background-color: rgba(212, 230, 175, 1);
    border-radius: 0 0 5px 5px;
    position: absolute;
    top: 0;
    right: 100px;
}

.div1 {
    display: flex;
    align-items: center;

}

.div2 {

    display: flex;
    flex-direction: column;
}

.div3 {
    display: flex;
    align-items: center;
    justify-content: center;
}

#ic {
    width: 60px;
    height: 60px;
    background-color: #d9d9d9;
    border-radius: 50%;
    margin-right: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.ni {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.hid {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #777777;
}

.v-card {
    width: 100%;
    box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.15);
    position: relative;
    display: flex;
    justify-content: space-between;
}

@media screen and (min-width:800px) and (max-width:1280px) {}
</style>