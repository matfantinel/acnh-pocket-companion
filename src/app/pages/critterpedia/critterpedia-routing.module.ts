import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CritterpediaPage } from './critterpedia.page';
import { CritterDetailsPage } from './critter-details/critter-details.page';

const routes: Routes = [
  {
    path: '',
    component: CritterpediaPage
  },
  {
    path: 'details',
    component: CritterDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CritterpediaPageRoutingModule {}
