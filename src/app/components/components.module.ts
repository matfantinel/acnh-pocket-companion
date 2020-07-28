import { NgModule } from '@angular/core';
import { CoolHeaderComponent } from './cool-header/cool-header.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SlideDrawerComponent } from './slide-drawer/slide-drawer.component';
import { VillagersComponent } from './villagers/villagers.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CoolHeaderComponent, SlideDrawerComponent, VillagersComponent],
  imports: [CommonModule, FormsModule, IonicModule.forRoot()],
  exports: [CoolHeaderComponent, SlideDrawerComponent, VillagersComponent]
})
export class ComponentsModule {}