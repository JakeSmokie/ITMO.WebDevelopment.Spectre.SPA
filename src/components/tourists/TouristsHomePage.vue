<template>
  <div>
    <b-nav fill tabs>
      <b-nav-item :to="'/tourists/planets'">
        Планеты 🌎
      </b-nav-item>
      <b-nav-item :to="'/tourists/races'">
        Туристы 😎
      </b-nav-item>
      <b-nav-item :to="'/keykeepers/stories'">
        Истории 📗
      </b-nav-item>
    </b-nav>

    <router-view
      v-if="loaded"
      :planets="planets"
      :races="races"
      :props="props"
      :tourist-info="touristInfo"
    />
  </div>
</template>

<script>
  import {KTouristsServiceFactory} from "@/services/tourists/KTouristsService";

  export default {
    name: "TouristsHomePage",
    props: ['planets', 'races', 'props'],

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
        .filter(x => x.stations
          .filter(y => y.id === this.touristInfo.origin.id).length > 0)[0];

      this.loaded = true;
    }
  }
</script>

<style scoped>

</style>
