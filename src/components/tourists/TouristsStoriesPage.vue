<template>
  <div>
    <tourists-stories-page-new-story
      :search-token.sync="searchToken"
      :stories="stories"
    />

    <tourists-stories-page-story
      v-for="story of orderBy(stories, 'id').filter(s => isInSearch(s))"
      :key="story.id"
      :story="story"
    />
  </div>
</template>

<script>
  import TouristsStoriesPageStory from "@/components/tourists/TouristsStoriesPageStory";
  import TouristsStoriesPageNewStory from "@/components/tourists/TouristsStoriesPageNewStory";
  import Vue2Filters from "vue2-filters";

  export default {
    name: "TouristsStoriesPage",
    components: {TouristsStoriesPageNewStory, TouristsStoriesPageStory},
    mixins: [Vue2Filters.mixin],
    props: ['stories'],

    data() {
      return {
        searchToken: ""
      }
    },

    methods: {
      isInSearch(s) {
        if (this.searchToken[0] === "#") {
          return s.id === Number(this.searchToken.substr(1));
        }

        if (this.searchToken[0] === "@") {
          return s.text.toLocaleUpperCase().includes(this.searchToken.substr(1).toLocaleUpperCase());
        }

        return s.name.toLocaleUpperCase().includes(this.searchToken.toLocaleUpperCase());
      },
    },
  }
</script>

