<template>
  <div>
    <b-list-group-item v-b-toggle="$id('collapse_planet_info')"
                       class="text-success" href="#">
      {{ planetData.name }}
    </b-list-group-item>
    <b-collapse :id="$id('collapse_planet_info')" class="mt-0" accordion="planets">
      <b-card>
        <text-input title="Название"
                    error-text="Название планеты должно состоять как минимум из одного символа"
                    :validator="x => x.toString().trim().length > 0"
                    v-on:submit="submit()"
                    v-bind:is-valid.sync="newNameCorrect"
                    v-bind:text.sync="planetData.name"
                    capitalize
        />

        <b-form-group
          description="Краткое описание планеты."
          class="mt-3"
        >
          <b-form-textarea
            v-model="planetData.description"
            placeholder="Описание планеты"
            rows="1"
            max-rows="6"
          />
        </b-form-group>

        <div>
          <b-row align-h="between">
            <b-col cols="auto" vertical-align="center">Станции</b-col>
            <b-col cols="auto">
              <b-button size="sm">Добавить</b-button>
            </b-col>
          </b-row>

          <div class="mt-2">
            <text-input v-on:submit="submit()" text="Москва" class="mt-1"/>
            <text-input v-on:submit="submit()" text="Нью-Йорк" class="mt-1"/>
            <text-input v-on:submit="submit()" text="Париж" class="mt-1"/>
            <text-input v-on:submit="submit()" text="Токио" class="mt-1"/>
          </div>
        </div>

        <b-form-group
          label="Уровни опасности"
          label-align="right"
          class="mt-3"
        >
          <div class="mt-1">
            <race-danger-selector race="Люди"></race-danger-selector>
            <race-danger-selector race="Чужие"></race-danger-selector>
            <race-danger-selector race="Диодао"></race-danger-selector>
            <race-danger-selector race="Аранки"></race-danger-selector>
          </div>
        </b-form-group>

        <b-row align-h="between">
          <b-col cols="auto" vertical-align="center"></b-col>
          <b-col cols="auto">
            <b-button size="sm" variant="danger">Отключить планету</b-button>
          </b-col>
        </b-row>

      </b-card>
    </b-collapse>
  </div>
</template>

<script>
  import TextInput from "@/components/misc/input/TextInput";
  import ButtonsSelector from "@/components/misc/input/ButtonsSelector";
  import RaceDangerSelector from "@/components/keykeepers/planets/RaceDangerSelector";
  import BButtonToolbar from "bootstrap-vue/src/components/button-toolbar/button-toolbar";
  import {PlanetEntity} from "@/classes/PlanetEntity";

  export default {
    name: "Planet",
    components: {BButtonToolbar, RaceDangerSelector, ButtonsSelector, TextInput},
    data() {
      return {
        planetData: this.planet,
        newNameCorrect: true
      }
    },

    props: {
      planet: {
        type: PlanetEntity
      }
    },

    methods: {
      submit() {
        if (!this.newNameCorrect) {
          return;
        }

        console.log('Value submitted...');
      }
    }
  }
</script>

<style scoped>

</style>
