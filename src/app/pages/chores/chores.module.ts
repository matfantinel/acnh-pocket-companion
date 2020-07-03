import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChoresPageRoutingModule } from './chores-routing.module';

import { ChoresPage } from './chores.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { ChoreCheckboxComponent } from 'src/app/components/chore-checkbox/chore-checkbox.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChoresPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ChoresPage, ChoreCheckboxComponent]
})
export class ChoresPageModule {}
