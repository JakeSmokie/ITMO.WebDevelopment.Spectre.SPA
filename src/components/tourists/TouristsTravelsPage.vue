<template>
  <div>
    <!--New travel-->
    <div class="m-3 mb-3">
      <div v-if="planet.disabled">
        <b-list-group-item class="text-danger mb-3">
          Внимание, текущая планета ({{ touristInfo.currentPlanet.name }}) временно отключена от системы ключников.
        </b-list-group-item>
      </div>

      <b-align-right>
        <b-button
          v-b-toggle="$id('collapse_travel')"
          size="sm"
          :disabled="!touristInfo.canUseGates"
        >
          Отправиться в путешествие
        </b-button>
      </b-align-right>
    </div>

    <b-collapse
      v-if="touristInfo.canUseGates"
      :id="$id('collapse_travel')"
      class="mt-0"
    >
      <b-card class="p-0">
        <div>
          <b-list-group-item
            v-b-toggle="$id('collapse_stations')"
            flush
            button
            class="p-3"
          >
            Выбрать точку отправления{{ chosenOriginStation === null ? '' : `: ${chosenOriginStation.name}` }}
          </b-list-group-item>
          <b-collapse
            :id="$id('collapse_stations')"
            class="mt-0"
          >
            <b-list-group-item
              v-for="station of orderBy(planet.stations, 'name')"
              :key="station.id"
              flush
              class="p-1"
              button
              :disabled="station === chosenOriginStation"
              :class="station === chosenOriginStation ? 'text-primary' : ''"
              :variant="station === chosenOriginStation ? 'light' : ''"
              @click="chooseStation(station)"
            >
              {{ station.name }}
            </b-list-group-item>
          </b-collapse>
        </div>

        <tourists-register-page-planet
          :race="touristInfo.race"
          :planets="planets"
          :chosen-planet.sync="chosenPlanet"
          :chosen-station.sync="chosenStation"
          :current-planet="planet"
          title="Выбрать точку назначения"
        />

        <b-align-right class="mt-4">
          <b-button
            size="sm"
            variant="outline-success"
            :disabled="chosenOriginStation == null || chosenStation == null || chosenPlanet == null || !touristInfo.canUseGates"
            @click="useGates"
          >
            Отправиться в путешествие
          </b-button>
        </b-align-right>
      </b-card>
    </b-collapse>

    <!--Travels-->
    <div v-if="travels.length > 0">
      <b-list-group-item
        v-b-toggle="$id('collapse_trace')"
        class="p-3 text-dark"
        button
      >
        Посещённые станции 🌌
      </b-list-group-item>
      <b-collapse
        :id="$id('collapse_trace')"
        class="mt-0"
        accordion="travels"
      >
        <b-card class="text-left">
          <div class="mb-1">
            {{ getPlanetOfStation(travels[0].origin).name }}:  {{ travels[0].origin.name }}
          </div>

          <div
            v-for="travel of travels"
            :key="travel.id"
            class="mb-1"
          >
            <b-row align-h="between">
              <b-col cols="auto">
                {{ getPlanetOfStation(travel.destination).name }}:  {{ travel.destination.name }}
              </b-col>
              <b-col cols="auto">
                {{ travel.date }}
              </b-col>
            </b-row>
          </div>
        </b-card>
      </b-collapse>
    </div>

    <tourists-travels-travel
      v-for="travel of travels"
      :key="travel.id"
      :travel="travel"
      :planets="planets"
    />
  </div>
</template>

<script>
  import BAlignRight from "@/components/misc/alignment/BAlignRight";
  import TouristsRegisterPagePlanet from "@/components/tourists/TouristsRegisterPagePlanet";
  import Vue2Filters from "vue2-filters";
  import {KTouristsTravelsServiceFactory} from "@/services/tourists/KTouristsTravelsService";
  import TouristsTravelsTravel from "@/components/tourists/TouristsTravelsTravel";

  export default {
    name: "TouristsTravelsPage",
    components: {TouristsTravelsTravel, TouristsRegisterPagePlanet, BAlignRight},
    mixins: [Vue2Filters.mixin],

    props: ['touristInfo', 'planets', 'races', 'travels'],

    data() {
      return {
        planet: this.touristInfo.currentPlanet,
        chosenOriginStation: null,
        chosenPlanet: null,
        chosenStation: null,
      }
    },

    methods: {
      chooseStation(station) {
        this.chosenOriginStation = station;
        this.$root.$emit('bv::toggle::collapse', this.$id('collapse_stations'));
      },

      async useGates() {
        const response = await KTouristsTravelsServiceFactory.getInstance()
          .useGates(this.chosenOriginStation, this.chosenStation);

        if (!response.success) {
          return;
        }

        this.travels.push(response.entity);

        const newPlanet = this.planets.filter(p => p.id === this.chosenStation.planetId)[0];
        this.touristInfo.currentPlanet = newPlanet;

        this.touristInfo.canUseGates = this.touristInfo.score >= 100;
        this.touristInfo.canSendStory = true;
        this.$root.$emit('bv::toggle::collapse', this.$id('collapse_travel'));

        this.$router.push('/tourists/travels/newtravel');
      },

      getPlanetOfStation(station) {
        return this.planets.filter(p => p.id === station.planetId)[0];
      },
    }
  }
</script>

<style scoped>
  .none {
    display: none;
  }
</style>
