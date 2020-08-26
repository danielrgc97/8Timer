import { Injectable } from '@angular/core';
import { Caja } from './caja.model';

@Injectable({
  providedIn: 'root'
})
export class CajasService {

  private cajas: Caja[] = [
    {
      id: '1',
      nombre: 'abs',
      timerValue: '10'
    },
    {
      id: '2',
      nombre: 'pushups',
      timerValue: '5'
    }
  ];

  constructor() { }

  getAllCajas(){
    return [...this.cajas];
  }
}
