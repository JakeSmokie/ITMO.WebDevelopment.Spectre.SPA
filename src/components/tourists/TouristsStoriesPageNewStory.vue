<template>
  <div>
    <div class="m-3 mb-3">
      <b-row align-h="between">
        <b-col>
          <b-form-input
            v-model="searchTokenProperty"
            v-focus
            size="sm"
            type="text"
            placeholder="Поиск историй"
          />
        </b-col>
        <b-col cols="auto">
          <b-button
            v-b-toggle="$id('collapse_add_story')"
            size="sm"
            :disabled="!canSendStory"
          >
            Отправить историю
          </b-button>
        </b-col>
      </b-row>
    </div>

    <b-collapse
      :id="$id('collapse_add_story')"
      class="mt-0"
    >
      <b-card>
        <text-input
          title="Название"
          error-text="У истории должно быть название"
          :validator="isNameValid"
          :text.sync="storyName"
          no-action
        />

        <b-form-group
          description=""
          class="mt-3"
        >
          <b-form-textarea
            v-model="story"
            placeholder="История."
            rows="6"
            max-rows="6"
            :state="isStoryValid()"
          />
        </b-form-group>

        <b-row align-h="end">
          <b-col class="mt-1 pr-0" cols="auto">
            <b-form-checkbox
              v-model="confirmed"
              :state="confirmed"
            />
          </b-col>
          <b-col cols="auto">
            <b-button
              size="sm"
              variant="outline-success"
              :disabled="!isNameValid() || !isStoryValid() || !confirmed || !canSendStory"
              @click="sendStory"
            >
              Отправить историю
            </b-button>
          </b-col>
        </b-row>
      </b-card>
    </b-collapse>
  </div>
</template>
<script>
  import {KTouristsStoriesServiceFactory} from "@/services/tourists/KTouristsStoriesService";
  import TextInput from "@/components/misc/input/TextInput";

  export default {
    name: 'TouristsStoriesPageNewStory',
    components: { TextInput},
    props: {
      searchToken: {}
    },

    data() {
      return {
        canSendStory: false,
        storyName: "",
        story: "",
        confirmed: false,
      }
    },

    computed: {
      searchTokenProperty: {
        get: function () {
          return this.searchToken;
        },
        set: function (value) {
          this.$emit('update:searchToken', value);
        }
      }
    },

    async created() {
      this.canSendStory = await KTouristsStoriesServiceFactory.getInstance()
        .canSendStory();
    },

    methods: {
      async sendStory() {
        const response = await KTouristsStoriesServiceFactory.getInstance()
          .sendStory(this.storyName, this.story);

        console.log(response);

        this.storyName = '';
        this.story = '';
        this.canSendStory = await KTouristsStoriesServiceFactory.getInstance()
          .canSendStory();

        this.$root.$emit('bv::toggle::collapse', this.$id('collapse_add_story'));
      },

      isNameValid() {
        return this.storyName.length > 0;
      },

      isStoryValid() {
        return this.story.length > 10;
      },
    },
  }
</script>
