<template>
  <div>
    <b-list-group-item v-b-toggle="$id('collapse1')"
                       class="text-success" href="#">
      {{ planet.name }}
    </b-list-group-item>
    <b-collapse :id="$id('collapse1')" class="mt-0" accordion="123">
      <b-card>
        <text-input title="Название" v-on:submit="submit()" v-bind:text.sync="planet.name"/>

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
  import FourButtonsSelector from "@/components/misc/input/FourButtonsSelector";
  import RaceDangerSelector from "@/components/keykeepers/planets/RaceDangerSelector";
  import BButtonToolbar from "bootstrap-vue/src/components/button-toolbar/button-toolbar";

  export default {
    name: "Planet",
    components: {BButtonToolbar, RaceDangerSelector, FourButtonsSelector, TextInput},
    data() {
      return {}
    },

    props: ['planet'],

    methods: {
      submit() {
        console.log('Value submitted...');
        return false;
      }
    }
  }
</script>

<style scoped>

</style>
