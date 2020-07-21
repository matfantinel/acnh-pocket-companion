export abstract class CritterBase {
  name: string;
  availability: CritterAvailability;
  price: number;
  museumPhrase: string;
  iconUri: string;
  caught: boolean;
  type: string;
}
export class Fish extends CritterBase {}
export class Bug extends CritterBase {}
export class SeaCreature extends CritterBase {}

export class CritterAvailability {
  location: string;
  rarity: string;
  time: string;
  isAllDay: boolean;
  isAllYear: boolean;
  monthsNorthernHemisphere: number[];
  monthsSouthernHemisphere: number[];
  hoursOfDay: number[];
}

export class Fossil {
  name: string;
  museumPhrase: string;
  iconUri: string;
  price: number;
  caught: boolean;
  type: string;
}