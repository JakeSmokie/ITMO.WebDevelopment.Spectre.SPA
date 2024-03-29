<template>
  <b-form @submit="onSubmit">
    <b-input-group
      :prepend="computedTitle"
      size="sm"
    >
      <b-form-input
        :value="text"
        size="sm"
        :state="validation"
        :formatter="format"
        @input="$emit('update:text', $event)"
        :placeholder="placeholder"
        :type="type"
        :name="name"
        :readonly="readOnly"
      />

      <b-input-group-append v-if="!noAction && !readOnly">
        <b-button
          variant="outline-success"
          type="submit"
          size="sm"
          :disabled="!validation"
        >
          {{ action }}
        </b-button>
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

      capitalize: {
        type: Boolean,
        default: false
      },

      noValidation: {
        type: Boolean,
        default: false
      },

      placeholder: {
        type: String,
        default: ""
      },

      type: {
        type: String,
        default: "text"
      },

      name: {
        type: String,
        default: ""
      },

      readOnly: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      validation() {
        if (this.noValidation) {
          return true;
        }

        return this.validator(this.text);
      },

      computedTitle() {
        return this.isDesktop() ? this.title : '';
      }
    },

    methods: {
      onSubmit(e) {
        e.preventDefault();

        this.$emit('submit');
      },

      format(value, event) {
        if (this.capitalize) {
          return value.replace(/(^|\s)\S/g, l => l.toUpperCase())
        }

        return value;
      },

      isDesktop() {
        return window.innerWidth > 500;
      }
    },
  }
</script>

<style scoped>
</style>
