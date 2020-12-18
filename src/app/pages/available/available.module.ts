import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvailablePageRoutingModule } from './available-routing.module';

import { AvailablePage } from './available.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvailablePageRoutingModule,
    ComponentsModule
  ],
  declarations: [AvailablePage]
})
export class AvailablePageModule {}
