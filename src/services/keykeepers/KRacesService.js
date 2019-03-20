import {HttpFactory} from "../utils/HttpService";
import Vue from "vue";

export class KRacesService {
  constructor() {
    this.http = HttpFactory.getInstance();
  }

  async getRaces() {
    const response = await this.http
      .get('keykeepers/races/getraces', {
        token: Vue.cookie.get('iPlanetDirectoryPro'),
      });

    return response.body.entity;
  }

  async saveName(race) {
    const response = await this.http
      .post('keykeepers/races/savename', {
        token: Vue.cookie.get('iPlanetDirectoryPro'),
        id: race.id,
        name: race.name,
      });

    return response.body;
  }

  async addRace() {
    const response = await this.http
      .post('keykeepers/races/addrace', {
        token: Vue.cookie.get('iPlanetDirectoryPro')
      });

    return response.body;
  }
}

export class KRacesServiceFactory {
  static getInstance() {
    if (this.instance == null) {
      this.instance = new KRacesService();
      this.instance.constructor = null;
    }
    return this.instance;
  }
}
