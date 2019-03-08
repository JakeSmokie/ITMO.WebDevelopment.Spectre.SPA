<template>
  <b-card class="mb-5">
    <text-input title="Название" noAction v-bind:text.sync="name"/>

    <b-form-group
      description="Краткое описание планеты."
      class="mt-3"
    >
      <b-form-textarea
        v-model="description"
        placeholder="Описание планеты"
        rows="1"
        max-rows="6"
      />
    </b-form-group>

    <b-row align-h="between">
      <b-col cols="auto"/>
      <b-col cols="auto">
        <b-button variant="outline-success" type="submit" size="sm">Добавить</b-button>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
  import TextInput from "@/components/misc/input/TextInput";

  export default {
    components: {TextInput},
    name: "PlanetAddForm",

    data() {
      return {
        name: "",
        description: ""
      }
    },

    methods: {
      onSubmit() {

      }
    }
  }
</script>

<style scoped>

</style>
