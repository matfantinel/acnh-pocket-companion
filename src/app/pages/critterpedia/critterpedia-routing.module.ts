import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CritterpediaPage } from './critterpedia.page';

const routes: Routes = [
  {
    path: '',
    component: CritterpediaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CritterpediaPageRoutingModule {}
