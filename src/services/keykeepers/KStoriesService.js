import {HttpFactory} from "../utils/HttpService";
import Vue from "vue";

export class KStoriesService {
  constructor() {
    this.http = HttpFactory.getInstance();
  }

  async getStories() {
    const response = await this.http
      .get('keykeepers/stories/getstories', {
        token: Vue.cookie.get('iPlanetDirectoryPro'),
      });

    return response.body.entity;
  }

  async rateStory(story, score) {
    const response = await this.http
      .post('keykeepers/stories/ratestory', {
        token: Vue.cookie.get('iPlanetDirectoryPro'),
        id: story.id,
        score: score - 1,
      });

    return response.body;
  }
}

export class KStoriesServiceFactory {
  static getInstance() {
    if (this.instance == null) {
      this.instance = new KStoriesService();
      this.instance.constructor = null;
    }
    return this.instance;
  }
}
