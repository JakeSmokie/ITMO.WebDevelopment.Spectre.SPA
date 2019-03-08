<template>
  <b-row align-h="end">
    <b-col cols="auto">{{ race }}</b-col>
    <b-col cols="auto">
      <four-buttons-selector v-bind:selected.sync="selected" v-on:clicked="updateSelected()"/>
    </b-col>
  </b-row>
</template>

<script>
  import FourButtonsSelector from "@/components/misc/input/FourButtonsSelector";

  export default {
    name: "RaceDangerSelector",

    props: {
      race: String,
      selected: {
        type: Number,
        default: 0
      }
    },

    components: {FourButtonsSelector},

    methods: {
      updateSelected() {
      }
    }
  }
</script>

<style scoped>

</style>
