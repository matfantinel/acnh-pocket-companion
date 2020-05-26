import { NgModule } from '@angular/core';
import { CoolHeaderComponent } from './cool-header/cool-header.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SlideDrawerComponent } from './slide-drawer/slide-drawer.component';

@NgModule({
    declarations: [CoolHeaderComponent, SlideDrawerComponent],
    imports: [CommonModule, IonicModule.forRoot()],
    exports: [CoolHeaderComponent, SlideDrawerComponent]
})
export class ComponentsModule {}