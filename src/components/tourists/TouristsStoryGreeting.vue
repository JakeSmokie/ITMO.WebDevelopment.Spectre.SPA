<template>
  <div
    class="container text-center mt-5"
    style="width: 300px;"
  >
    <b-card
      class="text-center"
    >
      <h1 class="mb-4">📘</h1>
      <p>Классная история! Жди ответа ключников.</p>

      <b-button
        variant="outline-primary"
        size="sm"
        :to="'/tourists'"
      >
        Идём дальше
      </b-button>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: "TouristsStoryGreeting"
  }
</script>

<style scoped>

</style>
