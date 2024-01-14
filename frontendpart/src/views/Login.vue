<template>
  <preLoader v-if="this.$store.state.isLoading"></preLoader>
  <div v-else class="log">
    <h2>Вход</h2>
    <v-sheet class="mx-auto">
      <v-form @submit.prevent class="form">
        <div class="inps">
          <v-text-field v-model="login" :rules="rules" label="Логин"></v-text-field>
          <v-text-field type="password" v-model="pass" :rules="rules" label="Пароль"></v-text-field>
        </div>
        <div class="btns">
          <v-btn block @click="logInFunc" width="100px" type="submit" class="mt-2">Войти</v-btn>
        </div>
        <p style="color: red;" v-if="errMsg">{{ errMsg }}</p>
      </v-form>
    </v-sheet>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'
import preLoader from '@/components/general/preLoader.vue'

export default defineComponent({
  name: "Login",
  data: () => ({
    errMsg: '' as string,
    login: '' as string,
    pass: '' as string,
    rules: [
      (value: string) => {
        if (value) return true

        return 'Вам нужно ввести корректные значения.'
      },
    ],
  }),
  components: {
    preLoader,
  },
  computed: {
    credentials: function () {
      return {
        login: this.login,
        password: this.pass
      }
    }
  },
  methods: {
    logInFunc: async function () {
      let res = await this.$store.dispatch('login', this.credentials)
      try {
        if (!res) {
          this.$router.push('/')
          console.log(this.$store.state.UsersState.cur_user)
        } else {
          this.errMsg = 'Не удалось войти'
        }
      } catch (error) {
        this.errMsg = 'Не удалось войти'
      }
    }
  }
},
)
</script>
  
<style>
.log {
  font-family: Arial, Helvetica, sans-serif;
  margin: auto;
  width: 816px;
  height: 445px;
  border-radius: 5px;
  background-color: rgba(53, 53, 53, 1);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 50px;
}

.mx-auto {
  background-color: rgba(240, 248, 255, 0);
  width: 100%;
}

.inp {
  border: 1.5px solid rgba(180, 201, 137, 1);
  background-color: white;
  margin-top: 30px;
  height: 55px;
}

.v-text-field {
  border: 1.5px solid rgba(180, 201, 137, 1);
  background-color: white;
  margin-top: 30px;
  height: 55px;
}

.btns {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.inps {
  width: 100%;
}
</style>
    
  