<template>
  <div>
    <b-list-group-item
      v-b-toggle="$id('collapse_tourist_info')"
      class="p-2"
      button
      :class="tourist.disabled ? 'text-danger' : 'text-success'"
    >
      {{ tourist.props['givenName'] + ' ' + tourist.props['sn'] }}
    </b-list-group-item>
    <b-collapse
      :id="$id('collapse_tourist_info')"
      class="mt-0"
      accordion="tourists"
    >
      <b-card>
        <div class="text-left mb-3">
          <p class="mb-1">Имя: {{ `${tourist.props['givenName']} ${tourist.props['sn']}` }}</p>
          <p class="mb-1">Родная планета: {{ `${planets.filter(p => p.id === tourist.origin.planetId)[0].name} (${tourist.origin.name})` }}</p>
          <p class="mb-1">Текущая планета: {{ tourist.currentPlanet.name }}</p>
          <p class="mb-1">Раса: {{ tourist.race.name }}</p>
          <b-row>
            <b-col cols="auto">
              <p class="mb-1">Прогресс:</p>
            </b-col>
            <b-col class="pl-0 pt-1">
              <b-progress :value="tourist.score" :max="100" show-value class="m-0" />
            </b-col>
          </b-row>
        </div>

        <b-list-group-item
          v-b-toggle="$id('collapse_travels')"
          class="text-success p-2"
          button
          accordion="travels_groups"
        >
          Путешествия
        </b-list-group-item>
        <b-collapse
          :id="$id('collapse_travels')"
          class="mt-0"
        >
          <tourists-travels-travel
            v-for="travel of touristTravels"
            :key="travel.id"
            :travel="travel"
            :planets="planets"
          />
        </b-collapse>

        <b-align-right class="mt-4">
          <button-switch
            on-text="Вывести из стазиса"
            off-text="Поместить в стазис"
            :enabled.sync="tourist.disabled"
            :clicked="switchTourist"
          />
        </b-align-right>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
  import TouristsTravelsTravel from "../../tourists/TouristsTravelsTravel";
  import BAlignRight from "../../misc/alignment/BAlignRight";
  import ButtonSwitch from "../../misc/input/ButtonSwitch";
  import {KeykeepersTouristsServiceFactory} from "../../../services/keykeepers/KeykeepersTouristsService";
  export default {
    name: "KeykeepersTouristsTourist",
    components: {ButtonSwitch, BAlignRight, TouristsTravelsTravel},
    props: ['tourist', 'travels', 'planets'],

    computed: {
      touristTravels() {
        return this.travels.filter(t => t.tourist.id === this.tourist.id);
      },
    },

    methods: {
      async switchTourist() {
        this.tourist.disabled = (await KeykeepersTouristsServiceFactory.getInstance()
          .switchTourist(this.tourist.id)).disabled;
      },
    },
  }
</script>

<style scoped>

</style>
