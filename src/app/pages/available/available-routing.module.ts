import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvailablePage } from './available.page';

const routes: Routes = [
  {
    path: '',
    component: AvailablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvailablePageRoutingModule {}
