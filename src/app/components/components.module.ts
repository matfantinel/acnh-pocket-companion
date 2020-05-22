import { NgModule } from '@angular/core';
import { CoolHeaderComponent } from './cool-header/cool-header.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [CoolHeaderComponent],
    imports: [CommonModule, IonicModule.forRoot()],
    exports: [CoolHeaderComponent]
})
export class ComponentsModule {}