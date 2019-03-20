import {HttpFactory} from "../utils/HttpService";
import Vue from 'vue';

export class KPlanetsService {
  constructor() {
    this.http = HttpFactory.getInstance();
  }

  async getPlanets() {
    const response = await this.http
      .get('keykeepers/planets/getplanets', {
        token: Vue.cookie.get('iPlanetDirectoryPro')
      });

    return response.body.entity;
  }

  async addPlanet(planet) {
    const response = await this.http
      .post('keykeepers/planets/addplanet', {
        token: Vue.cookie.get('iPlanetDirectoryPro'),
        name: planet.name,
        description: planet.description,
      });

    return response.body;
  }

  async addStation(planet) {
    const response = await this.http
      .post('keykeepers/planets/addstation', {
        token: Vue.cookie.get('iPlanetDirectoryPro'),
        id: planet.id,
      });

    return response.body;
  }

  async savePlanetNameDesc(planet) {
    const response = await this.http
      .post('keykeepers/planets/savenamedesc', {
        token: Vue.cookie.get('iPlanetDirectoryPro'),
        id: planet.id,
        name: planet.name,
        description: planet.description,
      });

    return response.body;
  }

  async switchPlanet(planet) {
    const response = await this.http
      .post('keykeepers/planets/switchplanet', {
        token: Vue.cookie.get('iPlanetDirectoryPro'),
        id: planet.id,
      });

    return response.body;
  }

  async saveStationName(station) {
    const response = await this.http
      .post('keykeepers/planets/updatestationname', {
        token: Vue.cookie.get('iPlanetDirectoryPro'),
        station: station.id,
        name: station.name
      });

    return response.body;
  }

  async updateRaceDangerLevel(planet, race, level) {
    const response = await this.http
      .post('keykeepers/planets/updateracedangerlevel', {
        token: Vue.cookie.get('iPlanetDirectoryPro'),
        planet: planet,
        race: race,
        level: level
      });

    return response.body;
  }
}

export class KPlanetsServiceFactory {
  static getInstance() {
    if (this.instance == null) {
      this.instance = new KPlanetsService();
      this.instance.constructor = null;
    }
    return this.instance;
  }
}
