import { Injectable, EventEmitter } from '@angular/core';
import { Page } from './page.model';

import { Plugins} from '@capacitor/core';
import { Subscription } from 'rxjs';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PaginasService {

  paginas: Page[] = [];
  thePage: Page;



  invokeNgOnInit = new EventEmitter();
  subsVar: Subscription;

  constructor() { }

  invoking() {
    this.invokeNgOnInit.emit();
  }


  getAllPages(){
    return [...this.paginas];
  }

  volcarPages(ps: Page[]){
    this.paginas = [];
    for ( let i = 0 ; i < ps.length ; i++){
      this.paginas[i] = ps[i];
    }
    this.setObjects();
  }

  setThePage(id: number) {
    this.thePage = this.paginas[id];
    console.log(this.thePage.name);
  }

  getThePage() {
    return this.thePage;
  }

  // Funciones gestion de almacenamiento

  async getObjects() {
    const s = await Storage.get({ key: 'MenuPages' });
    const j = JSON.parse(s.value);
    if ( j != null){
      for ( let i = 0 ; i < j.length ; i++){
        this.paginas[i] = j[i];
      }
    }
    if (this.thePage === undefined) { this.thePage = this.paginas[0]; }
    return s;
  }

  async setObjects() {
    const j = [];
    if ( this.paginas != null){
      for ( let i = 0 ; i < this.paginas.length ; i++){
        j[i] = this.paginas[i];
      }
    }
    await Storage.set({key: 'MenuPages', value: JSON.stringify(j)
    });
  }

}
