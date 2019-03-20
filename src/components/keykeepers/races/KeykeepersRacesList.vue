<template>
  <div>
    <div class="m-3 mb-3">
      <b-row align-h="between">
        <b-col>
          <b-form-input
            v-model="searchToken"
            v-focus
            size="sm"
            type="text"
            placeholder="Поиск рас"
          />
        </b-col>
        <b-col cols="auto">
          <b-button
            size="sm"
            @click="addRace"
          >
            Добавить расу
          </b-button>
        </b-col>
      </b-row>
    </div>

    <race
      v-for="race in filteredRaces"
      :key="Number(race.id)"
      :race.sync="race"
    />
  </div>
</template>

<script>
  import Race from "@/components/keykeepers/races/Race";
  import {KRacesServiceFactory} from "@/services/keykeepers/KRacesService";

  export default {
    name: "KeykeepersRacesList",
    components: {Race},
    props: {
      races: Array
    },

    data() {
      return {
        searchToken: ""
      }
    },

    computed: {
      filteredRaces() {
        return this.races
          .filter(x => x.name.toUpperCase().includes(this.searchToken.toUpperCase()))
          .sort((x, y) => x.id - y.id);
      }
    },

    methods: {
      async addRace() {
        const response = await KRacesServiceFactory.getInstance()
          .addRace();

        if (!response.success) {
          return;
        }

        this.races.push(response.entity);
      }
    }
  }
</script>

<style scoped>

</style>
