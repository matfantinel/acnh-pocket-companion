import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassportPage } from './passport.page';

const routes: Routes = [
  {
    path: '',
    component: PassportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassportPageRoutingModule {}
