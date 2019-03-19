<template>
  <div class="container homePageMain">
    <div>
      <b-nav
        fill
        tabs
      >
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
        <b-nav-item :to="{name: 'KeykeepersManual'}">
          <small>🏠</small>
        </b-nav-item>
        <b-nav-item
          @click="logout"
          class="bg-light"
        >
          <small>❌</small>
        </b-nav-item>
      </b-nav>
    </div>

    <router-view
      :planets="planets"
      :races="races"
      :props="props"
    />
  </div>
</template>

<script>
  import {KPlanetsServiceFactory} from "../../services/keykeepers/KPlanetsService";
  import {KRacesServiceFactory} from "../../services/keykeepers/KRacesService";
  import {AuthServiceFactory} from "@/services/auth/AuthService";

  export default {
    name: 'KeykeepersHomePage',

    data() {
      return {
        planets: [],
        races: [],
        props: {}
      }
    },

    async created() {
      const planets = await KPlanetsServiceFactory.getInstance().getPlanets();
      const races = await KRacesServiceFactory.getInstance().getRaces();
      const response = await AuthServiceFactory.getInstance().getAttributes();

      this.props = response.entity;
      this.planets = planets;
      this.races = races;
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
