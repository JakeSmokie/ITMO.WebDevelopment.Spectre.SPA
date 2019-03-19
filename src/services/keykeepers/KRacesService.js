import {HttpFactory} from "../utils/HttpService";

export class KRacesService {
  constructor() {
    this.http = HttpFactory.getInstance();
  }

  async getRaces() {
    const response = await this.http
      .get('keykeepers/races/getraces');

    return response.body.entity;
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
