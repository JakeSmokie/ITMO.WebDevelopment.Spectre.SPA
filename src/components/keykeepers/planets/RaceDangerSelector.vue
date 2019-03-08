<template>
  <b-row align-h="end">
    <b-col cols="auto">{{ race }}</b-col>
    <b-col cols="auto">
      <buttons-selector v-bind:selected.sync="currentSelection"
                        v-on:clicked="updateSelected()"
                        :variants="variants"/>
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
          {style: "success", text: "😊"},
        ],

        selected_: this.selected
      }
    },

    created() {
    },

    props: {
      race: String,
      selected: {
        type: Number,
        default: 0
      },

      levelUpdated: Function
    },

    components: {ButtonsSelector},

    methods: {
      updateSelected() {
        this.$emit('levelUpdated');
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
    }
  }
</script>

<style scoped>

</style>
