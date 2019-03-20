<template>
  <div class="mt-5">
    <p>Имя: {{ `${props['givenName']} ${props['sn']}` }}</p>
    <p>Родная планета: {{ `${touristInfo.planet.name} (${touristInfo.origin.name})` }}</p>
    <p>Раса: {{ touristInfo.race.name }}</p>
  </div>
</template>

<script>
  export default {
    name: "TouristsHomeHomePage",
    props: ['props', 'touristInfo']
  }
</script>

<style scoped>

</style>
