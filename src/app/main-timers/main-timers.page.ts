import { Component, OnInit } from '@angular/core';
import { Caja } from './caja.model';
import { CajasService } from './cajas.service';

import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-main-timers',
  templateUrl: './main-timers.page.html',
  styleUrls: ['./main-timers.page.scss'],
})
export class MainTimersPage implements OnInit {
  cajas: Caja[];

  constructor(private file: File, private cajasService: CajasService) { }

  ngOnInit() {
    this.cajas = this.cajasService.getAllCajas();
  }

  createFile(){

    this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err =>
      console.log('Directory doesnt exist'));

  }
}
