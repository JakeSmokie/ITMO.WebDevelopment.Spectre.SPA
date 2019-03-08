<template>
  <b-button
    v-on:click="updateState"
    :variant="enabled_ ? 'outline-success' : 'outline-danger'"
    size="sm"
  >
    {{ enabled_ ? onText : offText }}
  </b-button>
</template>

<script>
  export default {
    name: "ButtonSwitch",

    data() {
      return {
        enabled_: this.enabled
      }
    },

    props: {
      enabled: {
        type: Boolean,
        default: true
      },

      onText: String,
      offText: String,
    },

    computed: {
      currentEnabled: {
        get: function () {
          return this.enabled_;
        },
        set: function (value) {
          this.enabled_ = value;
          this.$emit('update:enabled', value);
        }
      }
    },

    methods: {
      updateState() {
        this.currentEnabled = !this.currentEnabled;
      }
    }
  }
</script>

<style scoped>

</style>
