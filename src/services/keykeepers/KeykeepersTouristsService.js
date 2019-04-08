import {HttpFactory} from "../utils/HttpService";
import Vue from "vue";

export class KeykeepersTouristsService {
  constructor() {
    this.http = HttpFactory.getInstance();
  }

  async getTourists() {
    const response = await this.http
      .get('keykeepers/tourists/gettourists', {
        token: Vue.cookie.get('iPlanetDirectoryPro'),
      });

    return response.body.entity;
  }

  async getTravels() {
    const response = await this.http
      .get('keykeepers/tourists/gettravels', {
        token: Vue.cookie.get('iPlanetDirectoryPro'),
      });

    return response.body.entity;
  }

  async switchTourist(id) {
    const response = await this.http
      .post('keykeepers/tourists/switchtourist', {
        token: Vue.cookie.get('iPlanetDirectoryPro'),
        id: id
      });

    return response.body.entity;
  }
}

export class KeykeepersTouristsServiceFactory {
  static getInstance() {
    if (this.instance == null) {
      this.instance = new KeykeepersTouristsService();
      this.instance.constructor = null;
    }
    return this.instance;
  }
}
