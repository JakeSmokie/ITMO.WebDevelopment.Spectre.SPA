<template>
  <div>
    <b-list-group-item
      v-b-toggle="$id('collapse_planet_info')"
      :class="planetData.disabled ?  'text-danger' : 'text-success'"
      button
    >
      {{ planetData.name }}
    </b-list-group-item>
    <b-collapse
      :id="$id('collapse_planet_info')"
      class="mt-0"
      accordion="planets"
    >
      <b-card>
        <text-input
          title="Название"
          error-text="Название планеты должно состоять как минимум из одного символа"
          :validator="isNameValid"
          :text.sync="planetData.name"
          capitalize
          @submit="savePlanetName()"
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
            <b-col
              cols="auto"
              vertical-align="center"
            >
              Станции
            </b-col>
            <b-col cols="auto">
              <b-button
                size="sm"
                @click="addStation()"
              >
                Добавить
              </b-button>
            </b-col>
          </b-row>

          <div class="mt-2">
            <text-input
              v-for="station of planetData.stations"
              :key="station.id"
              :text.sync="station.name"
              class="mt-1"
              :validator="isNameValid"
              capitalize
              @submit="saveStationName(station)"
            />
          </div>
        </div>

        <b-form-group
          label="Уровни опасности"
          label-align="right"
          class="mt-3"
        >
          <div class="mt-1">
            <race-danger-selector
              v-for="race of races"
              :key="Number(race.id)"
              :race="race.name"
              :selected.sync="racesData[race.id]"
              @level-updated="updateRaceDangerLevel(race.id)"
            />
          </div>
        </b-form-group>

        <b-align-right>
          <button-switch
            on-text="Подключить планету"
            off-text="Отключить планету"
            :enabled.sync="planetData.disabled"
            :clicked="switchPlanetState"
          />
        </b-align-right>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
  import TextInput from "@/components/misc/input/TextInput";
  import RaceDangerSelector from "@/components/keykeepers/planets/RaceDangerSelector";
  import {PlanetEntity} from "@/classes/PlanetEntity";
  import {StationOnPlanetEntity} from "@/classes/StationOnPlanetEntity";
  import ButtonSwitch from "@/components/misc/input/ButtonSwitch";
  import BAlignRight from "@/components/misc/alignment/BAlignRight";
  import {KPlanetsServiceFactory} from "@/services/keykeepers/KPlanetsService";

  export default {
    name: "Planet",
    components: {BAlignRight, ButtonSwitch, RaceDangerSelector, TextInput},

    props: ['planet', 'races'],
    data() {
      return {
        planetData: this.planet,
        newNameCorrect: true,
        racesData: []
      }
    },

    created() {
      for (let i = 0; i < this.planetData.races.length; i++) {
        this.racesData[this.planetData.races[i].id.race] = this.planetData.races[i].dangerLevel;
      }
    },

    methods: {
      async savePlanetName() {
        if (!this.isNameValid(this.planetData.name)) {
          return;
        }

        const response = await KPlanetsServiceFactory.getInstance()
          .savePlanetNameDesc(this.planetData);

        if (!response.success) {
          console.log('Oh no' + response);
          return;
        }
      },

      async saveStationName(station) {
        if (!this.isNameValid(station.name)) {
          return;
        }

        station = await KPlanetsServiceFactory.getInstance()
          .saveStationName(station);
      },

      async addStation() {
        const response = await KPlanetsServiceFactory.getInstance()
          .addStation(this.planetData);

        this.planetData.stations.push(response.entity);
      },

      async updateRaceDangerLevel(race) {
        await KPlanetsServiceFactory.getInstance()
          .updateRaceDangerLevel(this.planetData.id, race, this.racesData[race]);
      },

      async switchPlanetState() {
        const response = await KPlanetsServiceFactory.getInstance()
          .switchPlanet(this.planetData);
      },

      isNameValid(s) {
        if (s === undefined) {
          return false;
        }

        return s.trim().length > 0;
      },
    }
  }
</script>

<style scoped>

</style>
