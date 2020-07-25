import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CritterpediaPageRoutingModule } from './critterpedia-routing.module';

import { CritterpediaPage } from './critterpedia.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { CritterDetailsPage } from './critter-details/critter-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CritterpediaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CritterpediaPage, CritterDetailsPage]
})
export class CritterpediaPageModule {}
