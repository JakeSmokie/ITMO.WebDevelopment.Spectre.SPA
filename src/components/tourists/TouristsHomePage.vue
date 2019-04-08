<template>
  <div>
    <div v-if="loaded">
      <b-nav fill tabs justified>
        <b-nav-item :to="'/tourists/planets'">
          Планеты 🌎
        </b-nav-item>
        <!--<b-nav-item :to="'/tourists/races'" disabled>-->
          <!--Туристы 😎-->
        <!--</b-nav-item>-->
        <b-nav-item :to="'/tourists/stories'">
          <div :class="touristInfo.canSendStory ? 'text-success' : 'text-danger'">
            Истории {{ touristInfo.canSendStory ? '📗' : '📕' }}
          </div>
        </b-nav-item>
        <b-nav-item :to="'/tourists/travels'">
          <div :class="touristInfo.canUseGates ? 'text-success' : 'text-danger'">
            Путешествия {{ touristInfo.canUseGates ? '🚀' : '🚶' }}
          </div>
        </b-nav-item>
      </b-nav>

      <router-view
        :planets="planets"
        :races="races"
        :props="props"
        :stories="stories"
        :travels="travels"
        :tourist-info="touristInfo"
      />
    </div>
    <div v-if="!loaded">
      <p class="mt-5">Загрузка...</p>

      <b-spinner
        class="mt-5"
        variant="success"
        label="Spinning"
      />
    </div>
  </div>
</template>

<script>
  import {KTouristsServiceFactory} from "@/services/tourists/KTouristsService";
  import {AuthServiceFactory} from "@/services/auth/AuthService";
  import {KPlanetsServiceFactory} from "@/services/keykeepers/KPlanetsService";
  import {KRacesServiceFactory} from "@/services/keykeepers/KRacesService";
  import {KTouristsStoriesServiceFactory} from "@/services/tourists/KTouristsStoriesService";
  import {KTouristsTravelsServiceFactory} from "@/services/tourists/KTouristsTravelsService";

  export default {
    name: "TouristsHomePage",
    props: ['planets', 'races', 'props'],

    data() {
      return {
        touristInfo: {canSendStory: false, canUseGates: false},
        loaded: false,

        stories: [],
        travels: [],
      }
    },

    async created() {
      await this.loadInfo();
      this.touristInfo = (await KTouristsServiceFactory.getInstance()
        .getTouristProperties());

      this.travels = await KTouristsTravelsServiceFactory.getInstance()
        .getTravels();

      this.touristInfo.planet = this.planets
        .filter(x => x.id === this.touristInfo.origin.planetId)[0];

      this.loaded = true;
      this.updating();
    },

    destroyed() {
      this.loaded = false;
    },

    methods: {
      async updating() {
        while (this.loaded) {
          await this.sleep(1000);
          await this.loadInfo();
        }
      },

      async loadInfo() {
        try {
          const response = await KTouristsStoriesServiceFactory.getInstance().getStories();

          if (!response.success && this.loaded) {
            window.location.href = 'http://jakesmokie.ru';
          }

          this.stories = response.entity;
          const newInfo = (await KTouristsServiceFactory.getInstance()
            .getTouristProperties());

          this.touristInfo.canUseGates = newInfo.canUseGates;
          this.touristInfo.canSendStory = newInfo.canSendStory;
          this.touristInfo.currentPlanet.disabled = newInfo.currentPlanet.disabled;

          if (newInfo.currentPlanet.disabled) {
            this.touristInfo.canUseGates = false;
          }
        } catch (e) {}
      },

      sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      },
    },
  }
</script>

<style scoped>

</style>
