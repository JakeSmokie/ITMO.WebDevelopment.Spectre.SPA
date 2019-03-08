<template>
  <div>
    <div class="m-3 mb-3">
      <b-row align-h="between">
        <b-col>
          <b-form-input size="sm" type="text" placeholder="Поиск планет" v-model="searchToken"
                        v-focus/>
        </b-col>
        <b-col cols="auto">
          <b-button size="sm" v-b-toggle="$id('collapse_add_planet')">Добавить планету</b-button>
        </b-col>
      </b-row>
    </div>
    <b-list-group>
      <b-collapse :id="$id('collapse_add_planet')" class="mt-0">
        <planet-add-form v-on:new-planet="addPlanet($event)"/>
      </b-collapse>

      <planet v-for="planet of filteredPlanets"
              :key="planet.id"
              v-bind:planet.sync="planet"/>
    </b-list-group>
  </div>
</template>

<script>
  import ButtonsSelector from "../../misc/input/ButtonsSelector";
  import Planet from "./Planet";
  import {PlanetEntity} from "@/classes/PlanetEntity";
  import PlanetAddForm from "@/components/keykeepers/planets/PlanetAddForm";
  import {StationOnPlanetEntity} from "@/classes/StationOnPlanetEntity";
  import {RaceOnPlanetEntity} from "@/classes/RaceOnPlanetEntity";

  export default {
    name: 'KeykeepersPlanetsList',
    components: {PlanetAddForm, Planet, ButtonsSelector},

    data() {
      return {
        planets: [
          new PlanetEntity(0, "Земля", "Здесь живут люди", [
            new RaceOnPlanetEntity(0, "Люди", 3),
            new RaceOnPlanetEntity(1, "Чужие", 2),
            new RaceOnPlanetEntity(2, "Диодао", 1),
            new RaceOnPlanetEntity(3, "Аранки", 3),
          ], [
            new StationOnPlanetEntity(0, "Москва"),
            new StationOnPlanetEntity(1, "Нью-Йорк"),
            new StationOnPlanetEntity(2, "Париж"),
            new StationOnPlanetEntity(3, "Токио"),
          ]),
          new PlanetEntity(1, "Марс", "Elon Musk"),
          new PlanetEntity(2, "Плутон", "..."),
        ],

        searchToken: ""
      }
    },

    computed: {
      filteredPlanets() {
        return this.planets.filter(x =>
          x.name.toUpperCase().includes(this.searchToken.toUpperCase()));
      }
    },

    methods: {
      addPlanet(planet) {
        const newPlanet = Object.assign(new PlanetEntity(), planet);
        newPlanet.id = this.planets.length;

        // TODO: http

        this.planets.push(newPlanet);
      }
    }
  }
</script>

<style scoped>

</style>

