import {HttpFactory} from "../utils/HttpService";
import Vue from "vue";

export class KTouristsService {
  constructor() {
    this.http = HttpFactory.getInstance();
  }

  async register(race, planet, station) {
    const response = await this.http
      .post('tourists/auth/register', {
        token: Vue.cookie.get('iPlanetDirectoryPro'),
        race: race,
        planet: planet,
        station: station,
      });

    return response.body;
  }

  async isRegistered() {
    const response = await this.http
      .get('tourists/auth/isregistered', {
        token: Vue.cookie.get('iPlanetDirectoryPro')
      });

    return response.body.entity;
  }
}

export class KTouristsServiceFactory {
  static getInstance() {
    if (this.instance == null) {
      this.instance = new KTouristsService();
      this.instance.constructor = null;
    }
    return this.instance;
  }
}
