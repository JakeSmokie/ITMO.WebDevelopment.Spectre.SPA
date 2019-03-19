import superagent from 'superagent';
import superagentJsonapify from 'superagent-jsonapify';

export class HttpService {
  constructor() {
    this.apiUrl = "http://jakesmokie.ru:18080/spectre_back/webapi/";
    superagentJsonapify(superagent);
  }

  async get(url, query = {}) {
    return await superagent
      .get(this.apiUrl + url)
      .query(query);
  }

  async post(url, body, query = "") {
    return await superagent
      .post(this.apiUrl + url)
      .send(body)
      .query(query);
  }
}

export class HttpFactory {
  static getInstance() {
    if (this.instance == null) {
      this.instance = new HttpService();
      this.instance.constructor = null;
    }
    return this.instance;
  }
}
