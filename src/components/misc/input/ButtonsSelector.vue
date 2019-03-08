<template>
  <b-button-toolbar key-nav>
    <b-button-group size="sm">
      <b-button v-for="(variant, index) in variants"
                :key="index"
                v-bind:variant="(index === selected ? '' : 'outline-') + variant.style"
                v-on:click="selectItem(index)">
        {{ variant.text }}
      </b-button>
    </b-button-group>
  </b-button-toolbar>
</template>

<script>
  import BButtonToolbar from "bootstrap-vue/src/components/button-toolbar/button-toolbar";

  export default {
    name: "ButtonsSelector",
    components: {BButtonToolbar},
    props: {
      selected: {
        type: Number,
        default: 0
      },

      variants: {
        type: Object
      }
    },

    data() {
      return {
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
