import {RaceOnPlanetEntity} from "@/classes/RaceOnPlanetEntity";
import {StationOnPlanetEntity} from "@/classes/StationOnPlanetEntity";

export class PlanetEntity {
  id = -1;
  name = "";
  description = "";
  enabled = true;

  races = [new RaceOnPlanetEntity()];
  stations = [new StationOnPlanetEntity()];

  constructor(id, name, description, races, stations, enabled) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.races = races;
    this.stations = stations;
    this.enabled = enabled;
  }
}
