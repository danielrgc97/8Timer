import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainTimersPage } from './main-timers.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MainTimersPage,
    children: [
      {
        path: 'main-timers',
        loadChildren: () => import('../main-timers/main-timers.module').then( m => m.MainTimersPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: '/menu/main-timers'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainTimersPageRoutingModule {}
