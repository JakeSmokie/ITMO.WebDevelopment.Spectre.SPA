<template>
  <div class="mt-5">
    <b-spinner
      variant="success"
      type="grow"
      label="Spinning"
    />

    <div class="mt-5">
      <b-align-center>
        <buttons-selector
          :selected.sync="selected"
          :variants="variants"
          @clicked="updateSelected()"
        />
      </b-align-center>
    </div>
  </div>
</template>

<script>
  import ButtonsSelector from "@/components/misc/input/ButtonsSelector";
  import BAlignCenter from "@/components/misc/alignment/BAlignCenter";

  export default {
    name: 'HelloWorld',

    components: {BAlignCenter, ButtonsSelector},
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
        ],
      }
    },
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
