<template>
  <div
    class="container text-center mt-5"
  >
    <b-card
      class="text-center"
    >
      <h1 class="mb-4">😎</h1>
      <p class="mb-1">Имя: {{ `${props['givenName']} ${props['sn']}` }}</p>
      <p class="mb-1">Родная планета: {{ `${touristInfo.planet.name} (${touristInfo.origin.name})` }}</p>
      <p class="mb-1">
        Текущая планета:
        <span :class="styles[dangerLevel]">{{ touristInfo.currentPlanet.name }} {{ dangers[dangerLevel] }}</span>
      </p>
      <p class="mb-1">Раса: {{ touristInfo.race.name }}</p>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: "TouristsHomeHomePage",
    props: ['props', 'touristInfo'],

    data() {
      return {
        raceAtPlanet: this.touristInfo.currentPlanet.races.filter(x => x.id.race === this.touristInfo.race.id)[0],

        dangers: [
          '🤔',
          '☠️',
          '⚠️',
          '😊'
        ],

        styles: [
          'text-primary',
          'text-danger',
          'text-warning',
          'text-success',
        ],
      }
    },

    computed: {
      dangerLevel() {
        return this.raceAtPlanet === undefined ? 0 : this.raceAtPlanet.dangerLevel;
      },
    },
  }
</script>

<style scoped>

</style>
