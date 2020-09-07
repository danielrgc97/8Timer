import { Injectable } from '@angular/core';
import { Page } from './page.model';

import { Plugins} from '@capacitor/core';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PaginasService {

  paginas: Page[] = [];
  thePage: Page;

  constructor() {}

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
  }

  getThePage() {
    return [this.thePage];
  }

  // Funciones gestion de almacenamiento

  async getObjects() {
    const s = await Storage.get({ key: 'MenuPages' });
    const j = JSON.parse(s.value);
    if ( j != null){
      for ( let i = 0 ; i < j.length ; i++){
        this.paginas[i] = j[i];
        console.log(j[i]);
      }
    }
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
