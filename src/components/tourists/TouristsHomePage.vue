<template>
  <div>
    <b-nav fill tabs>
      <b-nav-item :to="'/tourists/planets'">
        Планеты 🌎
      </b-nav-item>
      <b-nav-item :to="'/tourists/races'" disabled>
        Туристы 😎
      </b-nav-item>
      <b-nav-item :to="'/tourists/stories'">
        Истории 📗
      </b-nav-item>
    </b-nav>

    <router-view
      v-if="loaded"
      :planets="planets"
      :races="races"
      :props="props"
      :stories="stories"
      :tourist-info="touristInfo"
    />
  </div>
</template>

<script>
  import {KTouristsServiceFactory} from "@/services/tourists/KTouristsService";

  export default {
    name: "TouristsHomePage",
    props: ['planets', 'races', 'props', 'stories'],

    data() {
      return {
        touristInfo: null,
        loaded: false,
      }
    },

    async created() {
      this.touristInfo = await KTouristsServiceFactory.getInstance()
        .getTouristProperties();

      this.touristInfo.planet = this.planets
        .filter(x => x.id === this.touristInfo.origin.planetId)[0];

      this.loaded = true;
    }
  }
</script>

<style scoped>

</style>
