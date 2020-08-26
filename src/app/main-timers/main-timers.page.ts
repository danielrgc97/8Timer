import { Component, OnInit } from '@angular/core';
import { Caja } from './caja.model';
import { CajasService } from './cajas.service';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';

const { Filesystem } = Plugins;

@Component({
  selector: 'app-main-timers',
  templateUrl: './main-timers.page.html',
  styleUrls: ['./main-timers.page.scss'],
})
export class MainTimersPage implements OnInit {
  cajas: Caja[];

  constructor(private cajasService: CajasService) { }

  ngOnInit() {
    this.cajas = this.cajasService.getAllCajas();
  }

  async fileWrite() {
    try {
      const result = await Filesystem.writeFile({
        path: 'secrets/text.txt',
        data: "This is a test",
        directory: FilesystemDirectory.ExternalStorage,
        encoding: FilesystemEncoding.UTF8
      })
      console.log('@Wrote file', result);
    } catch(e) {
      console.error('@Unable to write file', e);
    }
  }


}
