<template>
  <v-container align="start" justify="start">
    <div class="prform">
      <!-- <div class="ava">{{ user.full_name[0] }}</div> -->
      <div v-if="isEdit" class="pf">
        <div class="box">
          <div class="ln">
            Полное имя:<input class="inpPr" type="text" v-model="editUser.full_name" />
          </div>
        </div>
        <div class="box">
          <div class="ln">
            Email:<input class="inpPr" type="text" v-model="editUser.email" />
          </div>
        </div>
        <div class="box">
          <div class="ln">
            Пароль:<input class="inpPr" type="text" v-model="editUser.password" />
          </div>
        </div>
        <div class="box">
          <div class="ln">
            Логин:<input class="inpPr" type="text" disabled :value="user.login" />
          </div>
        </div>
        <v-btn variant="tonal" @click="save">ОК</v-btn>
      </div>

      <div v-else class="pf">
        <div class="box">
          <div class="ln">
            Полное имя:<input class="inpPr" type="text" disabled :value="user.full_name" />
          </div>
        </div>

        <div class="box">
          <div class="ln">
            Email:<input class="inpPr" type="text" disabled :value="user.email" />
          </div>
        </div>
        <div class="box">
          <div class="ln">
            Логин:<input class="inpPr" type="text" disabled :value="user.login" />
          </div>
        </div>
         
        <v-btn variant="tonal" @click="edit">Изменить</v-btn>
        <v-btn variant="tonal" @click="toggleTheme" style="margin-top: 10px;">Сменить тему</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import UserData from "@/components/profile/UserData";
import { defineComponent } from "vue";

import { useTheme } from "vuetify";

export default defineComponent({
  name: "ProfileView",
  components: {

  },
  mounted() {
    this.theme = useTheme()
    this.$store.dispatch('getUserInfo')
  },
  data() {
    return {
      editUser: {} as UserData,
      isEdit: false as boolean,
    };
  },
  computed: {
    user: function() {
      return this.$store.state.UsersState.cur_user 
    },
  },

  methods: {
    edit: function () {
      this.isEdit = !this.isEdit
      if (this.isEdit) {
        this.editUser = {...this.user}
      }
    },
    save: function () {
      this.user = {...this.editUser}
      this.$store.dispatch('updateUserData', this.editUser)

      this.isEdit = false
    },
    toggleTheme() {
      this.theme.global.name.value = this.theme.global.current.value.dark ? 'myCustomLightTheme' : 'myCustomDarkTheme'
    },


  }
});
</script>
<style>
.b2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 30px;
}

.box {
  display: flex;
  align-items: center;
}

.ln {
  margin-bottom: 20px;
  color: #585858;
  font-weight: 300;
  width: 100%;
  border-bottom: 1.5px solid #b4c989;
}

.inpPr {
  font-weight: 500;
  width: max-content;
  padding: 15px 10px 0 10px;
  outline: none;
}

.prform {
  margin-top: 30px;
  width: max-content;
  display: flex;
  justify-content: start;
}

.ava {
  margin-right: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 190px;
  width: 400px;
  height: 400px;
  background-color: #d9d9d9;
}

.pf {
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
