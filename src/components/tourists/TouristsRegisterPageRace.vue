<template>
  <div>
    <b-list-group-item
      v-b-toggle="$id('collapse_race_list')"
      class="p-3 text-dark"
      button
    >
      Выбрать свою расу
      {{ chosenRace != null ? `(${chosenRace.name})` : '' }}
    </b-list-group-item>
    <b-collapse
      :id="$id('collapse_race_list')"
      class="mt-0"
      accordion="choice"
    >
      <div
        v-for="race of races"
        :key="race.id"
        :planet="race"
      >
        <b-list-group-item
          class="p-1"
          button
          :class="race === chosenRace ? 'text-primary' : ''"
          :variant="race === chosenRace ? 'light' : ''"
          :disabled="race === chosenRace"
          @click="chooseRace(race)"
        >
          {{ race.name }}
        </b-list-group-item>
      </div>
    </b-collapse>
  </div>
</template>

<script>
  export default {
    name: "TouristsRegisterPageRace",
    props: ['races', 'chosenRace'],

    data() {
      return {
      }
    },

    methods: {
      chooseRace(race) {
        this.$emit('update:chosenRace', race);
        this.$root.$emit('bv::toggle::collapse', this.$id('collapse_race_list'));
      }
    }
  }
</script>

<style scoped>

</style>
