<template>
  <div>
    <b-align-center class="mt-5">
      Привет, {{ props["givenName"] + ' ' + props["sn"] }}! Скоро тут будет туториал.
    </b-align-center>
  </div>
</template>

<script>
  import BAlignCenter from "../misc/alignment/BAlignCenter";
  import {AuthServiceFactory} from "@/services/auth/AuthService";

  export default {
    name: "KeykeepersManual",
    components: {BAlignCenter},

    props: {
      props: {
        type: Object,
        default: null
      }
    },

    async created() {
    }
  }
</script>

<style scoped>

</style>
