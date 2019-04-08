<template>
  <div>
    <b-list-group-item
      v-b-toggle="$id('collapse_planet_list')"
      class="p-3 text-dark"
      button
    >
      {{ title }}
      {{ chosenStation != null && chosenPlanet != null ? `(${chosenPlanet.name}:&nbsp;${chosenStation.name})` : '' }}
    </b-list-group-item>
    <b-collapse
      :id="$id('collapse_planet_list')"
      class="mt-0"
      accordion="choice"
    >
      <div
        v-for="planet of orderBy(planets.filter(p => p.id !== (currentPlanet === undefined ? -1 : currentPlanet.id) && !p.disabled), 'name')"
        :key="planet.id"
        :planet="planet"
      >
        <b-list-group-item
          v-b-toggle="$id('collapse_stations') + planet.id"
          flush
          button
          class="p-2"
          :class="[planet === chosenPlanet ? 'text-primary' : '', raceDangerLevelClass(planet)]"
          :variant="planet === chosenPlanet ? 'light' : ''"
        >
          {{ planet.name }}
          {{ raceDangerLevel(planet) }}
        </b-list-group-item>
        <b-collapse
          :id="$id('collapse_stations') + planet.id"
          class="mt-0"
          accordion="choice_planet"
        >
          <b-list-group-item
            v-for="station of orderBy(planet.stations, 'name')"
            :key="station.id"
            flush
            class="p-1"
            button
            :disabled="station === chosenStation"
            :class="station === chosenStation ? 'text-primary' : ''"
            :variant="station === chosenStation ? 'light' : ''"
            @click="chooseStation(planet, station)"
          >
            {{ station.name }}
          </b-list-group-item>
        </b-collapse>
      </div>
    </b-collapse>
  </div>
</template>

<script>
  import Vue2Filters from "vue2-filters";

  export default {
    name: "TouristsRegisterPagePlanet",
    mixins: [Vue2Filters.mixin],
    props: ['planets', 'chosenPlanet', 'chosenStation', 'title', 'race', 'currentPlanet'],

    data() {
      return {
        levels: ['🤔', '☠️', '⚠️', '😊',],
        levelsClasses: ['', 'text-danger', 'text-warning', 'text-success'],
      }
    },

    methods: {
      raceDangerLevel(planet) {
        if (this.race === undefined) {
          return '';
        }

        const raceAtPlanet = this.getRaceAtPlanet(planet);
        return this.levels[raceAtPlanet === undefined ? 0 : raceAtPlanet.dangerLevel];
      },

      raceDangerLevelClass(planet) {
        if (this.race === undefined) {
          return '';
        }

        const raceAtPlanet = this.getRaceAtPlanet(planet);
        return this.levelsClasses[raceAtPlanet === undefined ? 0 : raceAtPlanet.dangerLevel];
      },

      getRaceAtPlanet(planet) {
        return planet.races.filter(x => x.id.race === this.race.id)[0];
      },

      chooseStation(planet, station) {
        this.$emit('update:chosenPlanet', planet);
        this.$emit('update:chosenStation', station);

        this.$root.$emit('bv::toggle::collapse', this.$id('collapse_planet_list'));
      }
    }
  }
</script>

<style scoped>

</style>
