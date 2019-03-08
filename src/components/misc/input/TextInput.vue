<template>
  <b-form @submit="onSubmit">
    <b-input-group :prepend="title" size="sm">
      <b-form-input v-bind:value="text"
                    v-on:input="$emit('update:text', $event)"
                    size="sm">
      </b-form-input>

      <b-input-group-append>
        <b-button variant="outline-success" type="submit" size="sm">{{ action }}</b-button>
      </b-input-group-append>
    </b-input-group>
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
      }
    },

    methods: {
      onSubmit(e) {
        e.preventDefault();
        this.$emit('submit');
      }
    }
  }
</script>

<style scoped>

</style>
