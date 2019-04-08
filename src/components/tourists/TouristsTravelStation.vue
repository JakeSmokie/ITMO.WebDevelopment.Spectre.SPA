<template>
  <div>
    <b-list-group-item
      v-b-toggle="$id('collapse_stations')"
      flush
      button
      class="p-3"
    >
      Выбрать точку отправления{{ chosenOriginStation === null ? '' : `: ${chosenOriginStation.name}` }}
    </b-list-group-item>
    <b-collapse
      :id="$id('collapse_stations')"
      class="mt-0"
    >
      <b-list-group-item
        v-for="station of orderBy(planet.stations, 'name')"
        :key="station.id"
        flush
        class="p-1"
        button
        :disabled="station === chosenOriginStation"
        :class="station === chosenOriginStation ? 'text-primary' : ''"
        :variant="station === chosenOriginStation ? 'light' : ''"
        @click="chooseStation"
      >
        {{ station.name }}
      </b-list-group-item>
    </b-collapse>
  </div>
</template>
<script>
  import Vue2Filters from "vue2-filters";
  export default {
    name: 'TouristsTravelStation',
    mixins: [Vue2Filters.mixin],
    props: {
      chooseStation: {},
      chosenOriginStation: {},
      planet: {}
    }
  }
</script>
