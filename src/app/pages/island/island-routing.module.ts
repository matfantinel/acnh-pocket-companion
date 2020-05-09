import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IslandPage } from './island.page';

const routes: Routes = [
  {
    path: '',
    component: IslandPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IslandPageRoutingModule {}
