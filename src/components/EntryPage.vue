<template>
  <div class="container main">
    <div>
      <b-jumbotron>
        <template slot="header">Врата ключников</template>

        <template slot="lead">
          Добро пожаловать!
        </template>

        <hr class="my-4" />

        <p>
          Кто Вы?
        </p>

        <b-button variant="outline-success" :to="'tourists/'" disabled>Я турист 🎒</b-button>
        <b-button variant="outline-danger" :to="'keykeepers/'">Я ключник 🔑</b-button>
      </b-jumbotron>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EntryPage'
  }
</script>

<style scoped>
</style>
