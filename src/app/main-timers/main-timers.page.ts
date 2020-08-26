import { Component, OnInit } from '@angular/core';
import { Caja } from './caja.model';
import { CajasService } from './cajas.service';

import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';

const { Filesystem } = Plugins;
const { Storage } = Plugins;

@Component({
  selector: 'app-main-timers',
  templateUrl: './main-timers.page.html',
  styleUrls: ['./main-timers.page.scss'],
})
export class MainTimersPage implements OnInit {
  cajas: Caja[];
  jsonString: string;

  constructor( private cajasService: CajasService) {}

  ngOnInit() {
    this.cajas = this.cajasService.getAllCajas();
  }


  testing(){
    console.log();
  }

  // async fileWrite() {
  //   try {
  //     const result = await Filesystem.writeFile({
  //       path: '/secrets/text.txt',
  //       data: "This is a test",
  //       directory: FilesystemDirectory.Data,
  //       recursive: true,
  //       encoding: FilesystemEncoding.UTF8
  //     })
  //     console.log('Wrote file', result);
  //   } catch(e) {
  //     console.error('Unable to write file', e);
  //   }
  // }

  // async setObject() {
  //   await Storage.set({
  //     key: '8Timer',
  //     value: JSON.stringify(
  //     )
  //   });
  // }

  // // JSON "get" example
  // async getObject() {
  //   const ret = await Storage.get({ key: '8Timer' });
  //   const user = JSON.parse(ret.value);
  // }

}
