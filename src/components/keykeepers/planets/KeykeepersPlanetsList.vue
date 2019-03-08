<template>
  <div>
    <div class="m-3 mb-3">
      <b-row align-h="between">
        <b-col>
          <b-form-input size="sm" type="text" placeholder="Поиск планет" v-model="searchToken"
                        v-focus/>
        </b-col>
        <b-col cols="auto">
          <b-button size="sm">Добавить планету</b-button>
        </b-col>
      </b-row>
    </div>
    <b-list-group>
      <planet v-for="planet of planets.filter(x => x.name.toUpperCase().includes(searchToken.toUpperCase()))"
              :key="planet.id"
              v-bind:planet="planet"/>
    </b-list-group>
  </div>
</template>

<script>
  import FourButtonsSelector from "../../misc/input/FourButtonsSelector";
  import Planet from "./Planet";

  export default {
    name: 'KeykeepersPlanetsList',
    components: {Planet, FourButtonsSelector},

    data() {
      return {
        planets: [
          {
            id: 0,
            name: "Земля",
            description: "Здесь живут люди"
          },
          {
            id: 1,
            name: "Марс",
            description: "Elon Musk"
          }
        ],

        searchToken: ""
      }
    },

    methods: {}
  }
</script>

<style scoped>

</style>

