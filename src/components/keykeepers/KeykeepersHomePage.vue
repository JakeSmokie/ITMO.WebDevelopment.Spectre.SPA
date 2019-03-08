<template>
  <div class="container homePageMain">
    <div>
      <b-nav justified tabs>
        <b-nav-item :to="'/keykeepers/planets'">Планеты 🌎</b-nav-item>
        <b-nav-item :to="'/keykeepers/races'">Расы 👽</b-nav-item>
        <b-nav-item :to="'/keykeepers/tourists'">Туристы 😎</b-nav-item>
        <b-nav-item :to="'/keykeepers/stories'">Истории 📗</b-nav-item>
        <b-nav-item :to="'/'" class="bg-light">Выйти</b-nav-item>
      </b-nav>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'KeykeepersHomePage'
  }
</script>

<style scoped>
  .homePageMain {
    max-width: 600px;
    text-align: center;
  }
</style>
