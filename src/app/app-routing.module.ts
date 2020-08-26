import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'main-timers',
    loadChildren: () => import('./main-timers/main-timers.module').then( m => m.MainTimersPageModule)
  },
  {
    path: '',
    redirectTo: 'main-timers',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
