import { Injectable } from '@angular/core';

@Injectable()
export class Utils {
    getCssVarValue(varName: string) {
        return getComputedStyle(document.documentElement)
            .getPropertyValue(varName);
    }
}