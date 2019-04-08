<template>
  <div>
    <div class="m-3 mb-3">
      <b-form-input
        v-model="searchToken"
        v-focus
        size="sm"
        type="text"
        placeholder="Поиск историй"
      />
    </div>

    <b-list-group-item
      v-b-toggle="$id('collapse_unaccepted')"
      class="p-3 text-success"
      button
    >
      Нерассмотренные истории 🤔
    </b-list-group-item>
    <b-collapse
      :id="$id('collapse_unaccepted')"
      class="mt-0"
      visible
    >
      <keykeepers-stories-story
        v-for="story of orderBy(stories, 'id').filter(s => !s.isAccepted && isInSearch(s))"
        :key="story.id"
        :story="story"
        :author="tourists.filter(t => t.id === story.authorId)[0]"
      />

      <b-list-group-item
        v-if="stories.filter(s => !s.isAccepted && isInSearch(s)).length === 0"
        class="p-3"
      >
        Историй нет 😕
      </b-list-group-item>
    </b-collapse>

    <b-list-group-item
      v-b-toggle="$id('collapse_accepted')"
      class="p-3 text-success"
      button
    >
      Рассмотренные истории ✔️
    </b-list-group-item>
    <b-collapse
      :id="$id('collapse_accepted')"
      class="mt-0"
      visible
    >
      <keykeepers-stories-story
        v-for="story of orderBy(stories, 'id').filter(s => s.isAccepted && isInSearch(s))"
        :key="story.id"
        :story="story"
        :author="tourists.filter(t => t.id === story.authorId)[0]"
      />

      <b-list-group-item
        v-if="stories.filter(s => s.isAccepted && isInSearch(s)).length === 0"
        class="p-3"
      >
        Историй нет 😕
      </b-list-group-item>
    </b-collapse>
  </div>
</template>

<script>
  import KeykeepersStoriesStory from "@/components/keykeepers/stories/KeykeepersStoriesStory";
  import Vue2Filters from "vue2-filters";

  export default {
    name: "KeykeepersStoriesList",
    components: {KeykeepersStoriesStory},
    props: ['stories', 'tourists'],
    mixins: [Vue2Filters.mixin],

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

<style scoped>

</style>
