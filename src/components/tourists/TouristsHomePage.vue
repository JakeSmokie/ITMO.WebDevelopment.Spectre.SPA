<template>
  <div>
    <b-nav fill tabs>
      <b-nav-item :to="'/tourists/planets'">
        Планеты 🌎
      </b-nav-item>
      <b-nav-item :to="'/keykeepers/races'">
        Расы 👽
      </b-nav-item>
      <b-nav-item :to="'/keykeepers/tourists'">
        Туристы 😎
      </b-nav-item>
      <b-nav-item :to="'/keykeepers/stories'">
        Истории 📗
      </b-nav-item>
    </b-nav>

    <router-view
      :planets="planets"
      :races="races"
      :props="props"
    />
  </div>
</template>

<script>
  export default {
    name: "TouristsHomePage",
    props: ['planets', 'races', 'props'],
  }
</script>

<style scoped>

</style>
