<template>
  <div class="text-center mt-lg-5">
    <b-spinner variant="success" type="grow" label="Spinning"/>

    <div>
      <buttons-selector v-bind:selected.sync="selected" v-on:clicked="updateSelected()" :variants="variants"/>
    </div>
  </div>
</template>

<script>
  import ButtonsSelector from "@/components/misc/input/ButtonsSelector";

  export default {
    name: 'HelloWorld',
    data() {
      return {
        variants: [
          {style: "secondary", text: "🤔"},
          {style: "danger", text: "🤢"},
          {style: "success", text: "😶"},
          {style: "success", text: "😐"},
          {style: "success", text: "🙂"},
          {style: "success", text: "😊"},
          {style: "success", text: "😍"},
        ]
      }
    },

    components: {ButtonsSelector},

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
