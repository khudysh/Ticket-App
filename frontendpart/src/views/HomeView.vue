<template>
  <AdminHomeView v-if="userType == 'admin'" />
  <UserHomeView v-if="userType == 'user'" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AdminHomeView from "./home/AdminHomeView.vue";
import UserHomeView from "./home/UserHomeView.vue";




export default defineComponent({
  name: "HomeView",

  components: {
    AdminHomeView, UserHomeView
  },
  data() {
    return {
      userType: "" as string,
    };
  },
  mounted() {
    this.userType = localStorage.getItem("userType") ?? "user";
    
  },
  methods: {

    
     
  },
  

});
</script>

<style></style>
