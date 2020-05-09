import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoPage } from './todo.page';

const routes: Routes = [
  {
    path: '',
    component: TodoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoPageRoutingModule {}
