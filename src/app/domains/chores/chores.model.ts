export class Chore {
  type: ChoreType;
  complete: boolean;
  completeData: Date;

  constructor(type: ChoreType) {
    this.type = type;
  }
}

export enum ChoreType {
  VillagerDIY = 'Villager DIY',
  MessageInABottle = 'Message in a bottle',
  HitRocks = 'Hit Rocks',
  MoneyTree = 'Money Tree',
  NookMiles = 'Nook Miles+ Tasks',
  Fossils = 'Fossils (3-5)'
}