<template>
  <div>
    <tourists-stories-page-new-story
      :search-token.sync="searchToken"
    />

    <tourists-stories-page-story
      v-for="story of stories"
      :key="story.id"
      :story="story"
    />
  </div>
</template>

<script>
  import TouristsStoriesPageStory from "@/components/tourists/TouristsStoriesPageStory";
  import TouristsStoriesPageNewStory from "@/components/tourists/TouristsStoriesPageNewStory";
  export default {
    name: "TouristsStoriesPage",
    components: {TouristsStoriesPageNewStory, TouristsStoriesPageStory},

    props: ['stories'],

    data() {
      return {
        searchToken: ""
      }
    },
  }
</script>

