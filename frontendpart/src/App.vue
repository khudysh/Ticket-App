<template>
  <template v-if="this.$route.name == 'Login'">
    <router-view />
  </template>
  <template v-else>
    <v-layout class="rounded rounded-md">
      <v-navigation-drawer class="nav" expand-on-hover rail>
        <v-list>
          <v-list-item class="logo" prepend-icon="mdi-menu" title="Support Desk" value="supdesk"></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list nav>
          <router-link class="link" to="/"><v-list-item prepend-icon="mdi-home" title="Главная"
              value="Home"></v-list-item></router-link>
          <router-link class="link" to="/profile"><v-list-item prepend-icon="mdi-account " title="Профиль"
              value="Profile"></v-list-item></router-link>
          <router-link class="link" to="/chat"><v-list-item prepend-icon="mdi-chat" title="Чат"
              value="Chat"></v-list-item></router-link>
        </v-list>

        <v-list id="m">
          <router-link class="link" to="/login" @click="logOut"><v-list-item prepend-icon="mdi-logout" title="Выйти из системы"
              value="logout"></v-list-item></router-link>
        </v-list>

      </v-navigation-drawer>

      <v-app-bar :title="this.$route.name" class="app"></v-app-bar>

      <v-main class="d-flex align-center justify-center">
        <router-view />
      </v-main>
    </v-layout>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  mounted() {
    this.checkAuth();
  },
  components: {
  },

  data() {
    return {
    }
  },
  methods: {
    checkAuth: function () {
      if (localStorage.getItem("isAuth") != 'true') {
        this.$router.replace('/login')
      }
    },
    logOut: function () {
      this.$store.commit('LOGOUT')
    }
  },
})
</script>
<style>
.logo {
  color: #B4C989;
}

.nav {
  background-color: #353535;

}

.link {
  text-decoration: none;
  color: white;
}

.main {
  margin: 10px;

}
</style>