import Vue from "vue";
import {HttpFactory} from "../utils/HttpService";

export class AuthService {
  constructor() {
    this.http = HttpFactory.getInstance();
  }

  async isAuthorized() {
    const token = Vue.cookie.get('iPlanetDirectoryPro');

    if (token == null) {
      return false;
    }

    const response = await this.http.get("auth/isauthorized", {
      token: token,
    });

    console.log('Authorized: ' + JSON.stringify(response.body));
    return response.body.entity;
  }

  async isKeykeeper() {
    const token = Vue.cookie.get('iPlanetDirectoryPro');

    if (token == null) {
      return false;
    }

    const response = await this.http.get("auth/iskeykeeper", {
      token: token,
    });

    console.log('Keykeeper: ' + JSON.stringify(response.body));
    return response.body.entity;
  }

  async login(login, pass) {
    // Vue.cookie.delete('iPlanetDirectoryPro');
    //
    // const response = await this.http.post("auth/login", "{}", {
    //   login: login,
    //   password: pass
    // });
    //
    // if (response.body.success === false) {
    //   return false;
    // }
    //
    // const token = response.body.entity.tokenId;
    // Vue.cookie.set('iPlanetDirectoryPro', token, 7);

    return false;
  }

  async logout() {
    location.replace(`http://jakesmokie.ru:8080/am/XUI/?goto=${window.location.href}#logout/`);

    const token = Vue.cookie.get('iPlanetDirectoryPro');

    const response = await this.http.post("auth/logout", "{}", {
      token: token
    });

    console.log('Logout: ' + JSON.stringify(response.body));
    Vue.cookie.delete('iPlanetDirectoryPro');
    return response.body;
  }

  async getAttributes(props = "") {
    const token = Vue.cookie.get('iPlanetDirectoryPro');

    const response = await this.http.post("auth/getattributes", "{}", {
      token: token,
      props: props
    });

    console.log('Attributes: ' + JSON.stringify(response.body));
    return response.body;
  }
}

export class AuthServiceFactory {
  static getInstance() {
    if (this.instance == null) {
      this.instance = new AuthService();
      this.instance.constructor = null;
    }
    return this.instance;
  }
}
