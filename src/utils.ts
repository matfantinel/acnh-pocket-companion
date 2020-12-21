import { Injectable } from '@angular/core';

@Injectable()
export class Utils {
  getCssVarValue(varName: string) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(varName);
  }

  static deepSpreadArray(array: any[]): any[] {
    if (array == null) {
      return null;
    }
    return array.map(q => {
      return { ...q }
    })
  }

  static areSameDay(date1: Date, date2: Date) {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  }

  static capitalize = (str) =>
    str.toLowerCase().replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());

  static setThemeColor(color: string) {
    document.querySelector('meta[name="theme-color"]').setAttribute('content',  color);
  }

  static areFishesImportedYet() : boolean {
    return localStorage.getItem('imported-fishes') === 'true';
  }
  static areBugsImportedYet() : boolean {
    return localStorage.getItem('imported-bugs') === 'true';
  }
  static areSeaCreaturesImportedYet() : boolean {
    return localStorage.getItem('imported-seaCreatures') === 'true';
  }
  static areFossilsImportedYet() : boolean {
    return localStorage.getItem('imported-fossils') === 'true';
  }
  static areVillagersImportedYet() : boolean {
    return localStorage.getItem('imported-villagers') === 'true';
  }

  static groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}

}