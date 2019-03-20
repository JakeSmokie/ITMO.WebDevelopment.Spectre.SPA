<template>
  <div>
    <b-list-group-item
      v-b-toggle="$id('collapse_race_info')"
      class="text-success"
      button
    >
      {{ raceData.name }}
    </b-list-group-item>
    <b-collapse
      :id="$id('collapse_race_info')"
      class="mt-0"
      accordion="races"
    >
      <b-card>
        <text-input
          title="Название"
          error-text="Название расы должно состоять как минимум из одного символа"
          :validator="isNameValid"
          :text.sync="raceData.name"
          capitalize
          @submit="saveName()"
        />
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
  import TextInput from "@/components/misc/input/TextInput";
  import {KRacesServiceFactory} from "@/services/keykeepers/KRacesService";
  export default {
    name: "Race",
    components: {TextInput},
    props: {
      race: Object,
    },

    data() {
      return {
        raceData: this.race,
      }
    },

    methods: {
      async saveName() {
        if (!this.isNameValid(this.raceData.name)) {
          return;
        }

        const response = await KRacesServiceFactory.getInstance()
          .saveName(this.raceData);
      },

      isNameValid(s) {
        if (s === undefined) {
          return false;
        }

        return s.trim().length > 0;
      },
    }
  }
</script>

<style scoped>

</style>
