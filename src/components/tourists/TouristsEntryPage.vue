<template>
  <div class="container homePageMain">
    <div>
      <b-align-right class="mb-4">
        <b-nav>
          <b-nav-item :to="'/tourists'">
            🏠
          </b-nav-item>
          <b-nav-item @click="logout">
            ❌
          </b-nav-item>
        </b-nav>
      </b-align-right>

      <router-view
        v-if="loaded"
        :planets="planets"
        :races="races"
        :props="props"
        :stories="stories"
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
  </div>
</template>

<script>
  import {AuthServiceFactory} from "@/services/auth/AuthService";
  import BAlignRight from "@/components/misc/alignment/BAlignRight";
  import {KPlanetsServiceFactory} from "@/services/keykeepers/KPlanetsService";
  import {KRacesServiceFactory} from "@/services/keykeepers/KRacesService";
  import {KTouristsStoriesServiceFactory} from "@/services/tourists/KTouristsStoriesService";

  export default {
    name: "TouristsEntryPage",
    components: {BAlignRight},
    data() {
      return {
        planets: [],
        races: [],
        props: {},
        stories: {},
        loaded: false
      }
    },

    async created() {
      const response = await AuthServiceFactory.getInstance().getAttributes();
      const planets = await KPlanetsServiceFactory.getInstance().getPlanets();
      const races = await KRacesServiceFactory.getInstance().getRaces();
      const stories = await KTouristsStoriesServiceFactory.getInstance().getStories();

      this.props = response.entity;
      this.planets = planets;
      this.races = races;
      this.stories = stories;

      this.loaded = true;
    },

    methods: {
      async logout() {
        const response = await AuthServiceFactory.getInstance()
          .logout();

        if (!response.success) {
          return;
        }

        this.$router.push({name: 'EntryPage'});
      }
    },
  }
</script>

<style scoped>
  .homePageMain {
    max-width: 600px;
    text-align: center;
  }
</style>
