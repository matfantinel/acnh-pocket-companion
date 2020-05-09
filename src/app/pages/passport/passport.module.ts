import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassportPageRoutingModule } from './passport-routing.module';

import { PassportPage } from './passport.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PassportPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PassportPage],
})
export class PassportPageModule {}
