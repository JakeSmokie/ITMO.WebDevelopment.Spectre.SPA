<template>
  <div class="mt-5">
    <p class="mb-5">
      Привет, {{ props["givenName"] + ' ' + props["sn"] }}! Вижу, ты тут в первый раз.
      Укажи основную информацию о себе.
    </p>

    <tourists-register-page-planet
      :planets="planets"
      :chosen-planet.sync="chosenPlanet"
      :chosen-station.sync="chosenStation"
      title="Выбрать родную планету"
    />
    
    <tourists-register-page-race
      :races="races"
      :chosen-race.sync="chosenRace"
    />

    <b-button
      class="mt-4"
      size="sm"
      variant="outline-success"
      :disabled="areFieldsNotFilled"
      @click="register"
    >
      Продолжить
    </b-button>
  </div>
</template>

<script>
  import TouristsRegisterPagePlanet from "@/components/tourists/TouristsRegisterPagePlanet";
  import TouristsRegisterPageRace from "@/components/tourists/TouristsRegisterPageRace";
  import {KTouristsServiceFactory} from "@/services/tourists/KTouristsService";

  export default {
    name: "TouristsRegisterPage",
    components: {TouristsRegisterPageRace, TouristsRegisterPagePlanet},

    props: ['planets', 'props', 'races'],

    data() {
      return {
        chosenRace: null,
        chosenPlanet: null,
        chosenStation: null,
      }
    },

    computed: {
      areFieldsNotFilled() {
        return this.chosenRace == null || this.chosenPlanet == null || this.chosenStation == null;
      }
    },

    methods: {
      async register() {
        if (this.areFieldsNotFilled) {
          return;
        }

        await KTouristsServiceFactory.getInstance()
          .register(this.chosenRace.id, this.chosenPlanet.id, this.chosenStation.id);

        await KTouristsServiceFactory.getInstance()
          .isRegistered();

        this.$router.push('/tourists');
      },
    }
  }
</script>

<style scoped>

</style>
