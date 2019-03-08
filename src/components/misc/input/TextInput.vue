<template>
  <b-form @submit="onSubmit">
    <b-input-group :prepend="title" size="sm">
      <b-form-input v-bind:value="text"
                    v-on:input="$emit('update:text', $event); $emit('update:is-valid', validation)"
                    size="sm"
                    :state="validation"
                    :formatter="format">
      </b-form-input>

      <b-input-group-append v-if="!noAction">
        <b-button variant="outline-success" type="submit" size="sm">{{ action }}</b-button>
      </b-input-group-append>
    </b-input-group>

    <b-form-invalid-feedback :state="validation">
      {{ errorText }}
    </b-form-invalid-feedback>
  </b-form>
</template>

<script>
  import BForm from "bootstrap-vue/src/components/form/form";

  export default {
    name: "TextInput",
    components: {BForm},
    props: {
      title: String,
      text: String,
      action: {
        type: String,
        default: "Сохранить"
      },

      errorText: {
        type: String,
        default: ""
      },

      noAction: {
        type: Boolean,
        default: false
      },

      validator: {
        type: Function,
        default: x => true
      },

      isValid: {
        type: Boolean,
        default: true
      },

      capitalize: {
        type: Boolean,
        default: false
      }
    },

    methods: {
      onSubmit(e) {
        e.preventDefault();

        this.$emit('update:is-valid', this.validation);
        this.$emit('submit');
      },

      format(value, event) {
        if (this.capitalize) {
          return value.replace(/(^|\s)\S/g, l => l.toUpperCase())
        }
      }
    },

    computed: {
      validation() {
        return this.validator(this.text);
      }
    },

    created() {
      this.$emit('update:is-valid', this.validation);
    }
  }
</script>

<style scoped>

</style>
