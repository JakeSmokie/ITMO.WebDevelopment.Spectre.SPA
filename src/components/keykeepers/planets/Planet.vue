<template>
  <div>
    <b-list-group-item v-b-toggle="$id('collapse_planet_info')"
                       href="#"
                       :class="planetData.enabled ? 'text-success' : 'text-danger'">
      {{ planetData.name }}
    </b-list-group-item>
    <b-collapse :id="$id('collapse_planet_info')" class="mt-0" accordion="planets">
      <b-card>
        <text-input title="Название"
                    error-text="Название планеты должно состоять как минимум из одного символа"
                    :validator="isNameValid"
                    v-on:submit="savePlanetName()"
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
              <b-button size="sm" v-on:click="addStation()">Добавить</b-button>
            </b-col>
          </b-row>

          <div class="mt-2">
            <text-input v-for="station of planetData.stations"
                        :key="station.id"
                        v-on:submit="saveStation(station)"
                        v-bind:text.sync="station.name"
                        class="mt-1"
                        :validator="isNameValid"
                        capitalize
            />
          </div>
        </div>

        <b-form-group
          label="Уровни опасности"
          label-align="right"
          class="mt-3"
        >
          <div class="mt-1">
            <race-danger-selector v-for="race of planetData.races"
                                  :key="race.id"
                                  :race="race.race"
                                  :selected.sync="race.level"
                                  v-on:level-updated="raceDangerLevelUpdated(race)"
            />
          </div>
        </b-form-group>

        <b-row align-h="between">
          <b-col cols="auto" vertical-align="center"/>
          <b-col cols="auto">
            <button-switch on-text="Отключить планету"
                    off-text="Подключить планету"
                    :enabled.sync="planetData.enabled"
            />
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
  import {StationOnPlanetEntity} from "@/classes/StationOnPlanetEntity";
  import ButtonSwitch from "@/components/misc/input/ButtonSwitch";

  export default {
    name: "Planet",
    components: {ButtonSwitch, BButtonToolbar, RaceDangerSelector, ButtonsSelector, TextInput},
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
      savePlanetName() {
        if (!this.isNameValid(this.planetData.name)) {
          return;
        }

        console.log('Value submitted...');
      },

      saveStation(station) {
        if (!this.isNameValid(station.name)) {
          return;
        }

        console.log("FUCK");
      },

      addStation() {
        const station = new StationOnPlanetEntity(this.planetData.stations.length, "Новая Станция");
        this.planetData.stations.push(station);
      },

      raceDangerLevelUpdated(race) {
        console.log(JSON.stringify(race));
      },

      isNameValid(s) {
        if (s === undefined) {
          return false;
        }

        return s.trim().length > 0;
      }
    }
  }
</script>

<style scoped>

</style>
