<template>
  <div class="container homePageMain">
    <div>
      <b-align-right class="mb-4">
        <b-nav>
          <b-nav-item :to="{name: 'KeykeepersManual'}">
            🏠
          </b-nav-item>
          <b-nav-item @click="logout">
            ❌
          </b-nav-item>
        </b-nav>
      </b-align-right>

      <b-nav fill tabs>
        <b-nav-item :to="{name: 'KeykeepersPlanetsList'}">
          Планеты 🌎
        </b-nav-item>
        <b-nav-item :to="'/keykeepers/races'">
          Расы 👽
        </b-nav-item>
        <b-nav-item :to="'/keykeepers/tourists'">
          Туристы 😎
        </b-nav-item>
        <b-nav-item :to="'/keykeepers/stories'">
          Истории 📗
        </b-nav-item>
      </b-nav>
    </div>

    <router-view
      v-if="loaded"
      :planets="planets"
      :races="races"
      :props="props"
    />

    <div v-if="!loaded">
      <p class="mt-5">Загрузка...</p>

      <b-spinner
        class="mt-5"
        variant="success"
        type="grow"
        label="Spinning"
      />
    </div>
  </div>
</template>

<script>
  import {KPlanetsServiceFactory} from "../../services/keykeepers/KPlanetsService";
  import {KRacesServiceFactory} from "../../services/keykeepers/KRacesService";
  import {AuthServiceFactory} from "@/services/auth/AuthService";
  import BAlignRight from "@/components/misc/alignment/BAlignRight";

  export default {
    name: 'KeykeepersHomePage',
    components: {BAlignRight},
    data() {
      return {
        planets: [],
        races: [],
        props: {},
        loaded: false
      }
    },

    async created() {
      const response = await AuthServiceFactory.getInstance().getAttributes();
      const planets = await KPlanetsServiceFactory.getInstance().getPlanets();
      const races = await KRacesServiceFactory.getInstance().getRaces();

      this.props = response.entity;
      this.planets = planets;
      this.races = races;

      this.loaded = true;
    },

    methods: {
      async logout() {
        const response = await AuthServiceFactory.getInstance().logout();
        console.log(response);

        if (!response.success) {
          return;
        }

        this.$cookie.delete('ssotoken');
        this.$router.push({name: 'EntryPage'});
      },

      sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    }
  }
</script>

<style scoped>
  .homePageMain {
    max-width: 600px;
    text-align: center;
  }
</style>
