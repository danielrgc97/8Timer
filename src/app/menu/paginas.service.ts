import { Injectable } from '@angular/core';
import { Page } from './page.model';

@Injectable({
  providedIn: 'root'
})
export class PaginasService {

  paginas: Page[];

  constructor() {
    this.paginas = [
      {
        id: 0,
        name: 'default',
        playPage: false,
        dictadoNombres: false
      },
      {
        id: 1,
        name: 'monday',
        playPage: false,
        dictadoNombres: false
      }
    ];
  }

}
