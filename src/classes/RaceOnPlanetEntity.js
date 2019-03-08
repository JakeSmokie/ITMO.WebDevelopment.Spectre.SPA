export class RaceOnPlanetEntity {
  raceId = 0;
  race = "";
  level = 0;

  constructor(raceId, race, level) {
    this.raceId = raceId;
    this.race = race;
    this.level = level;
  }
}
