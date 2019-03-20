<template>
  <div class="container main">
    <header class="jumbotron subhead mt-5 pb-4">
      <h1>404</h1>
      <p class="lead">Ничего не найдено</p>

      <b-button
        variant="outline-success"
        :to="'/'"
      >
        Уйти домой
      </b-button>
    </header>
  </div>
</template>

<script>
  export default {
    name: "PageNotFound",
  }
</script>

<style scoped>
  .main {
    width: 400px;
    text-align: center;
  }
</style>
