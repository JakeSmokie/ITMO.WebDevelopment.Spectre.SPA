<template>
  <div>
    <b-list-group-item
      v-b-toggle="$id('collapse_story')"
      class="p-3 text-dark"
      button
      >
      #{{ story.id }} "{{ story.name }}" {{ story.isAccepted ? variants[story.score + 1].text : '🤔' }}
    </b-list-group-item>
    <b-collapse
      :id="$id('collapse_story')"
      class="mt-0"
      accordion="stories"
    >
      <b-card class="text-left">
        <p class="mb-1">Отправлена: {{ story.submissionDate }}</p>
        <p class="mb-1">Статус: {{ story.isAccepted ? 'Рассмотрена' : 'Не рассмотрена' }}</p>
        <p v-if="story.isAccepted" class="mb-1">
          Оценка: {{ variants[story.score + 1].text }}
        </p>

        <b-form-textarea
          class="mt-3"
          :value="story.text"
          rows="30"
          max-rows="30"
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

    data() {
      return {
        variants: [
          {style: "secondary", text: "🤔"},
          {style: "danger", text: "🤢"},
          {style: "success", text: "😶"},
          {style: "success", text: "😐"},
          {style: "success", text: "🙂"},
          {style: "success", text: "😊"},
          {style: "success", text: "😍"},
        ],
      }
    },
  }
</script>

<style scoped>

</style>
