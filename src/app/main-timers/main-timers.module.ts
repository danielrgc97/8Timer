import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainTimersPageRoutingModule } from './main-timers-routing.module';

import { MainTimersPage } from './main-timers.page';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainTimersPageRoutingModule,
    DragDropModule
  ],
  declarations: [MainTimersPage]
})
export class MainTimersPageModule {}
