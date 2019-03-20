<template>
  <div>
    <b-list-group-item
      v-b-toggle="$id('collapse_planet_list')"
      class="p-3 text-dark"
      button
    >
      Выбрать родную планету
      {{ chosenStation != null && chosenPlanet != null ? `(${chosenPlanet.name}:&nbsp;${chosenStation.name})` : '' }}
    </b-list-group-item>
    <b-collapse
      :id="$id('collapse_planet_list')"
      class="mt-0"
      accordion="choice"
    >
      <div
        v-for="planet of planets"
        :key="planet.id"
        :planet="planet"
      >
        <b-list-group-item
          v-b-toggle="$id('collapse_stations') + planet.id"
          flush
          button
          class="p-2"
          :class="planet === chosenPlanet ? '' : 'text-success'"
          :variant="planet === chosenPlanet ? 'light' : ''"
        >
          {{ planet.name }}
        </b-list-group-item>
        <b-collapse
          :id="$id('collapse_stations') + planet.id"
          class="mt-0"
          accordion="choice_planet"
        >
          <b-list-group-item
            v-for="station of planet.stations"
            :key="station.id"
            flush
            class="p-1"
            button
            :disabled="station === chosenStation"
            :class="station === chosenStation ? '' : 'text-success'"
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
  export default {
    name: "TouristsRegisterPagePlanet",
    props: ['planets', 'chosenPlanet', 'chosenStation'],

    data() {
      return {
      }
    },

    methods: {
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
