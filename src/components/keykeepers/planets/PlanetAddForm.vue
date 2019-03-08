<template>
  <b-card class="mb-5">
    <text-input title="Название"
                error-text="Название планеты должно состоять как минимум из одного символа"
                :validator="isNameValid"
                v-bind:text.sync="planet.name"
                capitalize
                no-action
    />

    <b-form-group
      description="Краткое описание планеты."
      class="mt-3"
    >
      <b-form-textarea
        v-model="planet.description"
        placeholder="Описание планеты"
        rows="1"
        max-rows="6"
      />
    </b-form-group>

    <b-row align-h="between">
      <b-col cols="auto"/>
      <b-col cols="auto">
        <b-button variant="outline-success" size="sm" v-on:click="onSubmit">Добавить</b-button>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
  import TextInput from "@/components/misc/input/TextInput";
  import {PlanetEntity} from "@/classes/PlanetEntity";

  export default {
    components: {TextInput},
    name: "PlanetAddForm",

    data() {
      return {
        planet: new PlanetEntity(228, "", ""),
      }
    },

    methods: {
      onSubmit() {
        if (!this.isNameValid()) {
          return;
        }

        this.$emit('new-planet', this.planet);
      },

      isNameValid() {
        return this.planet.name.toString().trim().length > 0;
      }
    }
  }
</script>

<style scoped>

</style>
