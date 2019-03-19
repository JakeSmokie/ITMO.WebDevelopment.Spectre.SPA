<template>
  <b-button-group size="sm">
    <b-button
      v-for="(variant, index) in variants"
      :key="index"
      :variant="(index === currentSelection ? '' : 'outline-') + variant.style"
      @click="selectItem(index)"
    >
      {{ variant.text }}
    </b-button>
  </b-button-group>
</template>

<script>

  export default {
    name: "ButtonsSelector",
    components: {},
    props: {
      selected: {
        type: Number,
        default: 0
      },

      variants: {
        type: Array
      }
    },

    data() {
      return {
        selected_: this.selected
      }
    },

    computed: {
      currentSelection: {
        get: function () {
          return this.selected_;
        },

        set: function (value) {
          this.selected_ = value;
          this.$emit('update:selected', value);
        }
      }
    },

    methods: {
      selectItem(index) {
        if (index === this.currentSelection) {
          return;
        }

        this.currentSelection = index;
        this.$emit('clicked');
      }
    }
  }
</script>

<style scoped>

</style>
