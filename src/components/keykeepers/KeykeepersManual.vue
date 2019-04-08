<template>
  <div>
    <b-align-center class="mt-5">
      <p>Привет, {{ props["givenName"] + ' ' + props["sn"] }}! Скоро тут будет туториал.</p>
      <p class="mt-1">Не пишите, пожалуйста, гадостей.</p>
      <p class="mt-5">
        <small>
        </small>
      </p>
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
