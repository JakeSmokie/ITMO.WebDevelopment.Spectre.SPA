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
        <p class="mb-1">Автор: {{ author.props.givenName + ' ' + author.props.sn }}</p>
        <p class="mb-1">Отправлена: {{ story.submissionDate }}</p>
        <p class="mb-1">Статус: {{ story.isAccepted ? 'Рассмотрена' : 'Не рассмотрена' }}</p>
        <p v-if="story.isAccepted" class="mb-1">
          Оценка: {{ variants[story.score + 1].text }}
        </p>

        <b-form-textarea
          class="mt-3"
          :value="story.text"
          rows="20"
          max-rows="20"
          disabled
        />

        <div v-if="!story.isAccepted">
          <b-align-right class="mt-4">
            <buttons-selector
              :selected.sync="score"
              :variants="variants"
            />
          </b-align-right>
          <b-align-right class="mt-2">
            <b-button
              size="sm"
              variant="outline-success"
              :disabled="score === 0"
              @click="rateStory"
            >
              Оценить историю
            </b-button>
          </b-align-right>
        </div>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>
  import ButtonsSelector from "@/components/misc/input/ButtonsSelector";
  import BAlignRight from "@/components/misc/alignment/BAlignRight";
  import {KStoriesServiceFactory} from "@/services/keykeepers/KStoriesService";

  export default {
    name: "KeykeepersStoriesStory",
    components: {BAlignRight, ButtonsSelector},
    props: ['story', 'author'],

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

        score: 0
      }
    },

    methods: {
      async rateStory() {
        const response = await KStoriesServiceFactory.getInstance()
          .rateStory(this.story, this.score);

        console.log(response);

        if (!response.success) {
          return;
        }

        await this.$root.$emit('bv::toggle::collapse', this.$id('collapse_story'));
        this.story.score = this.score - 1;
        this.story.isAccepted = true;
      },
    },
  }
</script>

<style scoped>

</style>
