<template>
  <div
    class="container text-center mt-5"
    style="width: 300px;"
  >
    <b-card
      class="text-center"
    >
      <h1 class="mb-4">🌌</h1>
      <p class="mb-3">Добро пожаловать на планету '{{ touristInfo.currentPlanet.name }}'</p>
      <p :class="styles[dangerLevel]">
        {{ greetingTexts[dangerLevel] }}
      </p>

      <b-button
        variant="outline-primary"
        size="sm"
        :to="'/tourists'"
      >
        Идём дальше
      </b-button>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: "TouristsPlanetGreeting",
    props: ['touristInfo', 'planets'],

    data() {
      return {
        raceAtPlanet: this.touristInfo.currentPlanet.races.filter(x => x.id.race === this.touristInfo.race.id)[0],

        greetingTexts: [
          'Внимание, данных об этой планете для твоей расы нет. 🤔',
          'Стоит учесть, что тут предельно опасно. ☠️',
          'Будь осторожнее. ⚠️',
          'Здесь классно. 😊'
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
