<template>
  <div class="center-block">
    <slot />
  </div>
</template>

<script>
  export default {
    name: "BAlignCenter"
  }
</script>

<style scoped>
  .center-block {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }
</style>
