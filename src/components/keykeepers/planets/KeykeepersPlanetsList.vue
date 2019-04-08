<template>
  <div class="mb-5">
    <div class="m-3 mb-3">
      <b-row align-h="between">
        <b-col>
          <b-form-input
            v-model="searchToken"
            v-focus
            size="sm"
            type="text"
            placeholder="Поиск планет"
          />
        </b-col>
        <b-col
          v-if="!readOnly"
          cols="auto"
        >
          <b-button
            v-b-toggle="$id('collapse_add_planet')"
            size="sm"
          >
            Добавить планету
          </b-button>
        </b-col>
      </b-row>
    </div>
    <b-list-group>
      <b-collapse
        :id="$id('collapse_add_planet')"
        class="mt-0"
      >
        <planet-add-form @new-planet="addPlanet($event)"/>
      </b-collapse>

      <planet
        v-for="planet of orderBy(filteredPlanets, 'name')"
        :key="Number(planet.id)"
        :planet.sync="planet"
        :races="races"
        :read-only="readOnly"
        :tourist-info="touristInfo"
      />
    </b-list-group>
  </div>
</template>

<script>
  import Planet from "./Planet";
  import {PlanetEntity} from "@/classes/PlanetEntity";
  import PlanetAddForm from "@/components/keykeepers/planets/PlanetAddForm";
  import {StationOnPlanetEntity} from "@/classes/StationOnPlanetEntity";
  import {RaceOnPlanetEntity} from "@/classes/RaceOnPlanetEntity";
  import {KPlanetsServiceFactory} from "@/services/keykeepers/KPlanetsService";
  import Vue2Filters from "vue2-filters";

  export default {
    name: 'KeykeepersPlanetsList',
    components: {PlanetAddForm, Planet},
    mixins: [Vue2Filters.mixin],

    props: ['planets', 'races', 'readOnly', 'touristInfo'],

    data() {
      return {
        searchToken: ""
      }
    },

    computed: {
      filteredPlanets() {
        return this.planets
          .filter(x => x.name.toUpperCase().includes(this.searchToken.toUpperCase()))
          .sort((x, y) => x.id - y.id);
      }
    },

    async created() {

    },

    methods: {
      async addPlanet(planet) {
        const newPlanet = Object.assign(new PlanetEntity(), planet);
        newPlanet.id = this.planets.length;

        const response = await KPlanetsServiceFactory.getInstance()
          .addPlanet(newPlanet);

        if (!response.success) {
          console.log('Oh no...');
          return;
        }

        this.planets.push(response.entity);
      }
    }
  }
</script>

<style scoped>
</style>

