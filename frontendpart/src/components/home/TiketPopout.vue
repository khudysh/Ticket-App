<template lang="">
  <v-dialog v-model="dialog" width="auto" persistent>
    <v-card style="display: flex; flex-direction: column; justify-content: start" width="710px" height="max-content">
      <v-card-text style="display: flex; justify-content: space-between; flex: none">
        <div>
          <b> {{ ticket.summary }}</b>
        </div>
        <div style="width: 150px;">
          <v-select v-if="this.userType == 'admin'"
                        label="Статус"
                        v-model="ticket.status"
                        :items="['CREATED', 'WORKING', 'DONE']"
                        
                        variant="underlined"
                      ></v-select>
                      <v-select disabled v-if="this.userType == 'user'"
                        label="Select"
                        v-model="ticket.status"
                        :items="['CREATED', 'WORKING', 'DONE']"
                        variant="underlined"
                      ></v-select>
        </div>
        <div v-if="ticket.priority == 'MED'" class="proM">
          СРЕДНИЙ
        </div>
        <div v-if="ticket.priority == 'HIGH'" class="proH">
          ВАЖНЫЙ
        </div>
        <div v-if="ticket.priority == 'LOW'" class="proL">
          НИЗКИЙ
        </div>
      </v-card-text>
      <v-card-text style="display: flex; justify-content: space-between">
        <div>
          Дата создания: <b> {{ ticket.create_date }}</b> <br>
          Дата изменения: <b>{{ ticket.update_date }}</b>  
        </div>
        <div>
          Создатель: <b> {{ ticket.from }}</b>
        </div>
        <div>#{{ ticket.id }}</div>
      </v-card-text>
      <v-card-text>
        {{ ticket.content }}
      </v-card-text>
      <v-card-text>
        <textarea class='txt' v-show="this.userType == 'admin'" v-model='ticket.answ' clearable placeholder="Ответ пользователю"></textarea>
        <v-textarea v-show="this.userType == 'user'" disabled :model-value='ticket.answ' clearable label="Ответ админа"></v-textarea>
         
      </v-card-text>
      <v-card-actions>
        <v-btn v-show="this.userType=='admin'" variant="text" color="#6EA200" @click="updateTicket">Сохранить</v-btn>
        <v-btn variant="text" @click="close">Закрыть</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
    
  </template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TicketPopup",
  props: {
    dialog: {
      type: Boolean,
      required: true
    },
    ticket: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {
       
    }
  },
  mounted() {
    this.userType = localStorage.getItem("userType") ?? "user";
  },
  methods: {
    close() {
      this.$emit("close");
    },
    updateTicket: function () {
      this.$store.commit('updateTicket', {
        id: this.ticket.id,
        status: this.ticket.status,
        answ: this.ticket.answ,
        update_date: new Date().toISOString(),
      })
      this.close()
    }
  },
});
</script>
<style>
.txt {
  width: 100%;
  min-height: 150px;
  outline: none;
  padding: 15px;
  border-radius: 10px 10px 2px 2px;
}

.txt:focus {
  background-color: rgb(229, 229, 229);

}

.proM,
.proH,
.proL {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  width: 120px;
  border-radius: 0 0 5px 5px;
}

.proM {
  background-color: #ffb649;
}

.proH {
  background-color: #ff6749;
}

.proL {
  background-color: rgb(162, 224, 255);
}

.v-card-actions {
  display: flex;
  justify-content: space-between;
}
</style>

    