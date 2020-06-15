import { Injectable } from '@angular/core';

@Injectable()
export class Utils {
  getCssVarValue(varName: string) {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(varName);
  }

  static deepSpreadArray(array: any[]): any[] {
    return array.map(q => {
      return { ...q }
    })
  }
}