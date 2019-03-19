<template>
  <b-button
    :variant="enabled_ ? 'outline-success' : 'outline-danger'"
    size="sm"
    @click="updateState"
  >
    {{ enabled_ ? onText : offText }}
  </b-button>
</template>

<script>
  export default {
    name: "ButtonSwitch",

    props: {
      enabled: {
        type: Boolean,
        default: true
      },

      clicked: Function,
      onText: String,
      offText: String,
    },

    data() {
      return {
        enabled_: this.enabled
      }
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
        this.clicked();
      }
    }
  }
</script>

<style scoped>

</style>
