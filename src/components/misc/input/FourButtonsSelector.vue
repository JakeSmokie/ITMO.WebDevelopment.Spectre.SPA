<template>
  <b-button-toolbar key-nav>
    <b-button-group size="lg">
      <b-button v-for="(style, index) in variants"
                :key="style"
                v-bind:variant="(index === selected ? '' : 'outline-') + style"
                v-on:click="selectItem(index)">
      </b-button>
    </b-button-group>
  </b-button-toolbar>
</template>

<script>
  import BButtonToolbar from "bootstrap-vue/src/components/button-toolbar/button-toolbar";

  export default {
    name: "FourButtonsSelector",
    components: {BButtonToolbar},
    props: {
      selected: {
        type: Number,
        default: 0
      }
    },

    data() {
      return {
        variants: [
          "secondary",
          "danger",
          "warning",
          "success"
        ]
      }
    },

    methods: {
      selectItem(index) {
        this.selected = index;
        this.$emit('update:selected', index);
        this.$emit('clicked');
      }
    }
  }
</script>

<style scoped>

</style>
