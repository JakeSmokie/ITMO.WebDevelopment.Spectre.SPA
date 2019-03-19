<template>
  <b-button
    @click="exit"
    variant="outline-danger"
  >
    X
  </b-button>
</template>

<script>
  import {AuthServiceFactory} from "@/services/auth/AuthService";

  export default {
    name: "TouristsEntryPage",
    async created() {
      const response = await AuthServiceFactory.getInstance()
        .getAttributes();

      console.log(this.$cookie.get('iPlanetDirectoryPro'));
    },

    methods: {
      async exit() {
        const response = await AuthServiceFactory.getInstance()
          .logout();

        if (!response.success) {
          return;
        }

        this.$router.push({name: 'EntryPage'});
      }
    },
  }
</script>

<style scoped>

</style>
