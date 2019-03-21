import {HttpFactory} from "../utils/HttpService";
import Vue from "vue";

export class KTouristsStoriesService {
  constructor() {
    this.http = HttpFactory.getInstance();
  }

  async canSendStory() {
    const response = await this.http
      .get('tourists/stories/cansendstory', {
        token: Vue.cookie.get('iPlanetDirectoryPro')
      });

    return response.body.entity;
  }

  async sendStory(name, text) {
    const response = await this.http
      .post('tourists/stories/sendstory', {
        token: Vue.cookie.get('iPlanetDirectoryPro'),
        name: name,
        text: text
      });

    return response.body;
  }

  async getStories() {
    const response = await this.http
      .get('tourists/stories/getstories', {
        token: Vue.cookie.get('iPlanetDirectoryPro'),
      });

    return response.body.entity;
  }
}

export class KTouristsStoriesServiceFactory {
  static getInstance() {
    if (this.instance == null) {
      this.instance = new KTouristsStoriesService();
      this.instance.constructor = null;
    }
    return this.instance;
  }
}
