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

}