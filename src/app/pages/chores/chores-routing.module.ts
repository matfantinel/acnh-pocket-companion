import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChoresPage } from './chores.page';

const routes: Routes = [
  {
    path: '',
    component: ChoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChoresPageRoutingModule {}
