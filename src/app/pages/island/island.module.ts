import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IslandPageRoutingModule } from './island-routing.module';

import { IslandPage } from './island.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IslandPageRoutingModule,
    ComponentsModule
  ],
  declarations: [IslandPage]
})
export class IslandPageModule {}
