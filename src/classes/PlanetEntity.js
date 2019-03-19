export class PlanetEntity {
  constructor(id = -1, name = "", description = "", races = [], stations = [], enabled = true) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.races = races;
    this.stations = stations;
    this.enabled = enabled;
  }
}
