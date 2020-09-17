import { Injectable } from '@angular/core';
import { Caja } from './caja.model';

import { Plugins} from '@capacitor/core';
import { PaginasService } from '../menu/paginas.service';
import { Page } from '../menu/page.model';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CajasService {

  thePage: Page;
  cajas: Caja[] = [];

  constructor(private paginasService: PaginasService) {}

  // Funciones de la logica de servicio cajas

  getAllCajas(){
    return [...this.cajas];
  }

  volcarCajas(cs: Caja[]){
    this.cajas = [];
    for ( let i = 0 ; i < cs.length ; i++){
      this.cajas[i] = cs[i];
    }
    this.setObjects();
  }

  // Funciones gestion de almacenamiento

  async getObjects() {
    this.thePage = this.paginasService.getThePage();
    const s = await Storage.get({ key: this.thePage.name });
    const j = JSON.parse(s.value);
    this.cajas = [];

    if ( j != null){
      for ( let i = 0 ; i < j.length ; i++){
        this.cajas[i] = j[i];
      }
      return s;
    }

    if (this.cajas[0] === undefined) {
      this.volcarCajas(
        [{"type":"circuit","role":"circuit","groupId":0,"display":true,"enabled":true,"circuitState":11,"id":0,"timerName":null,"timerValue":null,"countingValue":null,"displayString":null,"counting":false,"interval":null,"circuitPos":1,"circuitName":"1","circuitDoingLap":1,"circuitLaps":1,"visible":true},{"type":"timer","role":"timer","groupId":0,"display":true,"enabled":true,"circuitState":3,"id":1,"timerName":"1","timerValue":1,"countingValue":1,"displayString":"0:01","counting":false,"interval":null,"circuitPos":2,"circuitName":null,"circuitDoingLap":1,"circuitLaps":null,"visible":true},{"type":"circuit","role":"circuit","groupId":1,"display":true,"enabled":true,"circuitState":11,"id":2,"timerName":null,"timerValue":null,"countingValue":null,"displayString":null,"counting":false,"interval":null,"circuitPos":1,"circuitName":"1","circuitDoingLap":1,"circuitLaps":1,"visible":true},{"type":"timer","role":"timer","groupId":1,"display":true,"enabled":true,"circuitState":1,"id":3,"timerName":"1","timerValue":1,"countingValue":1,"displayString":"0:01","counting":false,"interval":25,"circuitPos":2,"circuitName":null,"circuitDoingLap":1,"circuitLaps":null,"visible":true},{"type":"timer","role":"timer","groupId":1,"display":true,"enabled":true,"circuitState":2,"id":4,"timerName":"1","timerValue":1,"countingValue":0,"displayString":"0:00","counting":false,"interval":26,"circuitPos":3,"circuitName":null,"circuitDoingLap":1,"circuitLaps":null,"visible":true},{"type":"timer","role":"timer","groupId":1,"display":true,"enabled":true,"circuitState":3,"id":5,"timerName":"1","timerValue":1,"countingValue":1,"displayString":"0:01","counting":false,"interval":null,"circuitPos":4,"circuitName":null,"circuitDoingLap":1,"circuitLaps":null,"visible":true},{"type":"circuit","role":"circuit","groupId":2,"display":true,"enabled":true,"circuitState":11,"id":6,"timerName":null,"timerValue":null,"countingValue":null,"displayString":null,"counting":false,"interval":null,"circuitPos":1,"circuitName":"2","circuitDoingLap":1,"circuitLaps":2,"visible":true},{"type":"circuit","role":"circuit","groupId":3,"display":true,"enabled":true,"circuitState":11,"id":7,"timerName":null,"timerValue":null,"countingValue":null,"displayString":null,"counting":false,"interval":null,"circuitPos":1,"circuitName":"2","circuitDoingLap":1,"circuitLaps":2,"visible":true},{"type":"timer","role":"timer","groupId":3,"display":true,"enabled":true,"circuitState":3,"id":8,"timerName":"1","timerValue":1,"countingValue":1,"displayString":"0:01","counting":false,"interval":null,"circuitPos":2,"circuitName":null,"circuitDoingLap":1,"circuitLaps":null,"visible":true},{"type":"circuit","role":"circuit","groupId":4,"display":true,"enabled":true,"circuitState":11,"id":9,"timerName":null,"timerValue":null,"countingValue":null,"displayString":null,"counting":false,"interval":null,"circuitPos":1,"circuitName":"1","circuitDoingLap":1,"circuitLaps":1,"visible":true},{"type":"timer","role":"timer","groupId":4,"display":true,"enabled":true,"circuitState":1,"id":10,"timerName":"1","timerValue":1,"countingValue":1,"displayString":"0:01","counting":false,"interval":null,"circuitPos":2,"circuitName":null,"circuitDoingLap":1,"circuitLaps":null,"visible":true},{"type":"timer","role":"timer","groupId":4,"display":true,"enabled":true,"circuitState":3,"id":11,"timerName":"1","timerValue":1,"countingValue":1,"displayString":"0:01","counting":false,"interval":null,"circuitPos":3,"circuitName":null,"circuitDoingLap":1,"circuitLaps":null,"visible":true}]
      );
      this.setObjects();
    }
  }

  async setObjects() {
    this.thePage = this.paginasService.getThePage();
    const j = [];
    if ( this.cajas != null){
      for ( let i = 0 ; i < this.cajas.length ; i++){
        j[i] = this.cajas[i];
      }
    }
    // console.log(JSON.stringify(j));
    await Storage.set({key: this.thePage.name, value: JSON.stringify(j)
    });
  }
}
