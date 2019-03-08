import {RaceOnPlanetEntity} from "@/classes/RaceOnPlanetEntity";
import {StationOnPlanetEntity} from "@/classes/StationOnPlanetEntity";

export class PlanetEntity {
  id = -1;
  name = "";
  description = "";
  enabled;

  races = [];
  stations;

  constructor(id, name, description, races, stations = [], enabled = true) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.races = races;
    this.stations = stations;
    this.enabled = enabled;
  }
}
