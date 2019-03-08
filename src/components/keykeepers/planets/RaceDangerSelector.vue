<template>
  <b-row align-h="end">
    <b-col cols="auto">{{ race }}</b-col>
    <b-col cols="auto">
      <buttons-selector v-bind:selected.sync="selected" v-on:clicked="updateSelected()" :variants="variants"/>
    </b-col>
  </b-row>
</template>

<script>
  import ButtonsSelector from "@/components/misc/input/ButtonsSelector";

  export default {
    name: "RaceDangerSelector",

    data() {
      return {
        variants: [
          {style: "secondary", text: "🤔"},
          {style: "danger", text: "☠️"},
          {style: "warning", text: "⚠️"},
          {style: "success", text: "😍"},
        ]
      }
    },

    props: {
      race: String,
      selected: {
        type: Number,
        default: 0
      }
    },

    components: {ButtonsSelector},

    methods: {
      updateSelected() {
      }
    }
  }
</script>

<style scoped>

</style>
