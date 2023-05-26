<template>
  <div class="home">
    <h1>Hello : {{ name }}</h1>
    <button @click="doLogout">logout</button>
    <ArticleCard></ArticleCard>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";
import ArticleCard from "@/components/ArticleCard.vue"; // @ is an alias to /src
import api from "@/service/apiClient";
import { logout } from "@/service/AuthenticationService";

export default defineComponent({
  name: "HomeView",
  components: {
    ArticleCard,
  },

  setup() {
    let name: any = ref("hamza");
    api.get("/test").then((response) => {
      name = response.data;
    });

    const doLogout = () => {
      logout()
        .then(() => {
          window.location.href = "/login";
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return {
      name,
      doLogout,
    };
  },
});
</script>
