<template>
  <div>
    <b-list-group-item
      v-b-toggle="$id('collapse_story')"
      class="p-3 text-dark"
      button
    >
      {{ story.name }}
    </b-list-group-item>
    <b-collapse
      :id="$id('collapse_story')"
      class="mt-0"
      accordion="stories"
    >
      <b-card>
        <b-form-textarea
          :value="story.text"
          rows="20"
          max-rows="20"
          disabled
        />
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
  export default {
    name: "TouristsStoriesPageStory",
    props: ['story'],
  }
</script>

<style scoped>

</style>
