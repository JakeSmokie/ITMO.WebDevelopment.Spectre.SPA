import {HttpFactory} from "../utils/HttpService";
import Vue from "vue";

export class KTouristsTravelsService {
  constructor() {
    this.http = HttpFactory.getInstance();
  }

  async useGates(origin, destination) {
    const response = await this.http
      .post('tourists/travels/usegates', {
        token: Vue.cookie.get('iPlanetDirectoryPro'),
        origin: origin.id,
        destination: destination.id,
      });

    return response.body;
  }

  async getTravels() {
    const response = await this.http
      .get('tourists/travels/gettravels', {
        token: Vue.cookie.get('iPlanetDirectoryPro')
      });

    return response.body.entity;
  }
}

export class KTouristsTravelsServiceFactory {
  static getInstance() {
    if (this.instance == null) {
      this.instance = new KTouristsTravelsService();
      this.instance.constructor = null;
    }
    return this.instance;
  }
}
