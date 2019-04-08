<template>
  <div class="container homePageMain mb-5">
    <div>
      <b-align-right class="mb-4">
        <b-nav>
          <b-nav-item :href="`http://jakesmokie.ru:8080/am/XUI/?goto=${url}#profile/details`">
            ⚙️
          </b-nav-item>
          <b-nav-item :to="{name: 'KeykeepersManual'}">
            🏠
          </b-nav-item>
          <b-nav-item @click="logout">
            ❌
          </b-nav-item>
        </b-nav>
      </b-align-right>

      <b-nav fill tabs justified>
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
          <span :class="anyUnacceptedStories ? 'text-success' : 'text-danger'">Истории </span>
          {{ anyUnacceptedStories ? '📗' : '📕' }}
        </b-nav-item>
      </b-nav>
    </div>

    <router-view
      v-if="loaded"
      :planets="planets"
      :races="races"
      :props="props"
      :stories="stories"
      :tourists="tourists"
      :travels="travels"
    />

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
  import {KPlanetsServiceFactory} from "../../services/keykeepers/KPlanetsService";
  import {KRacesServiceFactory} from "../../services/keykeepers/KRacesService";
  import {AuthServiceFactory} from "@/services/auth/AuthService";
  import BAlignRight from "@/components/misc/alignment/BAlignRight";
  import {KStoriesServiceFactory} from "@/services/keykeepers/KStoriesService";
  import {KeykeepersTouristsServiceFactory} from "@/services/keykeepers/KeykeepersTouristsService";

  export default {
    name: 'KeykeepersHomePage',
    components: {BAlignRight},
    data() {
      return {
        planets: [],
        races: [],
        props: [],
        stories: [],
        tourists: [],
        travels: [],
        loaded: false,
      }
    },

    computed: {
      url() {
        return window.location.href;
      },

      anyUnacceptedStories() {
        return this.stories.filter(s => !s.isAccepted).length > 0;
      }
    },

    async created() {
      const props = await AuthServiceFactory.getInstance().getAttributes();
      const planets = await KPlanetsServiceFactory.getInstance().getPlanets();
      const races = await KRacesServiceFactory.getInstance().getRaces();
      this.props = props.entity;
      this.planets = planets;
      this.races = races;

      await this.updateData();
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
          await this.updateData();
        }
      },

      async updateData() {
        try {
          this.stories = await KStoriesServiceFactory.getInstance().getStories();
          this.travels = await KeykeepersTouristsServiceFactory.getInstance().getTravels();
          this.tourists = await KeykeepersTouristsServiceFactory.getInstance().getTourists();
        } catch (e) {
        }
      },

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
