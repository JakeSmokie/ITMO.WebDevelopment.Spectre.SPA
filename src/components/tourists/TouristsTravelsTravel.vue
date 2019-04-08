<template>
  <div>
    <b-list-group-item
      v-b-toggle="$id('collapse_travel')"
      class="p-3 text-dark"
      button
    >
      #{{ travel.id }} от {{ travel.date }}
    </b-list-group-item>
    <b-collapse
      :id="$id('collapse_travel')"
      class="mt-0"
      accordion="travels"
    >
      <b-card class="text-left">
        <p class="mb-1">Дата: {{ travel.date }}</p>
        <p class="mb-1">От: {{ getPlanetOfStation(travel.origin).name }}, {{ travel.origin.name }}</p>
        <p class="mb-1">До: {{ getPlanetOfStation(travel.destination).name }}, {{ travel.destination.name }}</p>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
  export default {
    name: "TouristsTravelsTravel",
    props: ['travel', 'planets'],

    methods: {
      getPlanetOfStation(station) {
        return this.planets.filter(p => p.id === station.planetId)[0];
      }
    }
  }
</script>

<style scoped>

</style>
