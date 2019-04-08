<template>
  <div>
    <div class="m-3 mb-3">
      <b-form-input
        v-model="searchToken"
        v-focus
        size="sm"
        type="text"
        placeholder="Поиск туристов"
      />
    </div>

    <keykeepers-tourists-tourist
      v-for="tourist of filteredTourists"
      :key="tourist.id"
      :tourist="tourist"
      :travels="travels"
      :planets="planets"
    />
  </div>
</template>

<script>
  import KeykeepersTouristsTourist from "@/components/keykeepers/tourists/KeykeepersTouristsTourist";
  export default {
    name: "KeykeepersTourists",
    components: {KeykeepersTouristsTourist},
    props: ['tourists', 'travels', 'planets'],

    data() {
      return {
        searchToken: ""
      }
    },

    computed: {
      filteredTourists() {
        return this.tourists
          .filter(x => (x.props['givenName'] + ' ' + x.props['sn']).toUpperCase().includes(this.searchToken.toUpperCase()))
          .sort((x, y) => x.id - y.id);
      }
    },
  }
</script>

<style scoped>

</style>
