<template>
  <b-row align-h="end">
    <b-col cols="auto">
      {{ race }}
    </b-col>
    <b-col cols="auto">
      <buttons-selector
        :selected.sync="currentSelection"
        :variants="variants"
        :read-only="readOnly"
        @clicked="updateSelected()"
      />
    </b-col>
  </b-row>
</template>

<script>
  import ButtonsSelector from "@/components/misc/input/ButtonsSelector";

  export default {
    name: "RaceDangerSelector",

    components: {ButtonsSelector},

    props: {
      race: String,
      selected: {
        type: Number,
        default: 0
      },

      levelUpdated: Function,
      readOnly: Boolean
    },

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

    created() {
    },

    methods: {
      updateSelected() {
        this.$emit('level-updated');
      }
    }
  }
</script>

<style scoped>

</style>
