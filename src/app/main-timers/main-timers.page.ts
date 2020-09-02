import { Component, OnInit } from '@angular/core';
import { Caja } from './caja.model';
import { CajasService } from './cajas.service';
import { AlertController } from '@ionic/angular';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-main-timers',
  templateUrl: './main-timers.page.html',
  styleUrls: ['./main-timers.page.scss'],
})
export class MainTimersPage implements OnInit {

  cajas: Caja[];
  showGroup = true;

  constructor( public alertController: AlertController, private cajasService: CajasService) {}

  ngOnInit() {
    this.cajasService.getObjects().then( _ => {
      this.cajas = this.cajasService.getAllCajas();
    }).then(_ => {
      for (const c of this.cajas){
        this.displayStringFormer(c.id);
      }
    });
  }

  // Alerts
  async createCajaTimerAlert(){
    const alert = await this.alertController.create({
      header: 'Creating a timer',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name of the timer '
        },
        {
          name: 'hours',
          type: 'number',
          placeholder: 'Number of hours ( 0 - 9 )'
        },
        {
          name: 'minutes',
          type: 'number',
          placeholder: 'Number of minutes ( 0 - 59 )'
        },
        {
          name: 'seconds',
          type: 'number',
          placeholder: 'Number of seconds ( 0 - 59 )'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (data) => {
            if ( data.name === '' || (data.hours === '' && data.minutes === '' && data.seconds === '' ) ) {
              this.createCajaTimerAlert();
              this.basicAlert('A timer must have at least a name and a time field');
            } else if ((data.hours > 9 || data.hours < 0) || (data.minutes > 59 || data.minutes < 0) ||
             (data.seconds > 59 || data.seconds < 0) ) {
              this.createCajaTimerAlert();
              this.basicAlert('Introduce allowed values');
            } else {
              let totalTimeValue =  data.hours * 3600 + data.minutes * 60 + 1 * data.seconds;
              if (totalTimeValue === 0){ totalTimeValue = 1; }
              this.cajasService.addCaja( 'timer', 0, data.name, totalTimeValue, null, null);
              this.ngOnInit();
            }
          }
        }
      ]
    });

    await alert.present();
  }
  async editCajaTimerAlert(id: number){
    const alert = await this.alertController.create({
      header: 'Configure',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Current name : ' + this.cajas[id].timerName
        },
        {
          name: 'hours',
          type: 'number',
          placeholder: 'Current hours : ' + Math.floor(this.cajas[id].timerValue / 3600 )
        },
        {
          name: 'minutes',
          type: 'number',
          placeholder: 'Current minutes : ' + Math.floor(this.cajas[id].timerValue % 3600 / 60)
        },
        {
          name: 'seconds',
          type: 'number',
          placeholder: 'Current seconds : ' + Math.floor(this.cajas[id].timerValue % 3600 % 60)
        }
      ],
      buttons: [
        {
          text: 'Delete',
          handler: (data) => {
            this.cajasService.deleteCaja(id);
            this.ngOnInit();
          }
        },
        {
          text: 'Confirm',
          handler: (data) => {
            if ((data.hours > 9 || data.hours < 0) || (data.minutes > 59 || data.minutes < 0) ||
             (data.seconds > 59 || data.seconds < 0) ) {
              this.editCajaTimerAlert(id);
              this.basicAlert('Introduce allowed values');
            } else {
              if ( data.name === '' ) { data.name = this.cajas[id].timerName; }
              if ( data.hours === '' ) { data.hours = Math.floor(this.cajas[id].timerValue / 3600 ); }
              if ( data.minutes === '' ) { data.minutes = Math.floor(this.cajas[id].timerValue % 3600 / 60); }
              if ( data.seconds === '' ) { data.seconds = Math.floor(this.cajas[id].timerValue % 3600 % 60); }

              let totalTimeValue =  data.hours * 3600 + data.minutes * 60 + 1 * data.seconds;
              if (totalTimeValue > 35999) {totalTimeValue = 35999; }

              console.log(totalTimeValue);

              this.cajasService.editCaja(id, data.name, totalTimeValue);
              this.ngOnInit();
            }
          }
        }
      ]
    });

    await alert.present();
  }
  async createCajaCircuitAlert(){
    const alert = await this.alertController.create({
      header: 'Creating new circuit',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name of the circuit'
        },
        {
          name: 'laps',
          type: 'number',
          placeholder: 'Laps of the circuit'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: (data) => {
            if ( data.name === '' || data.time === '' ){
              this.createCajaCircuitAlert();
            }else{
              this.cajasService.addCaja('circuit', 11, null, null, data.name, parseInt(data.laps, 10));
              this.ngOnInit();
            }
          }
        }
      ]
    });

    await alert.present();
  }
  async basicAlert(message: string){

    const alert = await this.alertController.create({
      header: message,
      buttons: [
        {
          text: 'Accept',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  // Timer controls
  playpause(id: number){
    if ( this.cajas[id].counting === true ){
      this.pause(id);
    } else{
      this.play(id);
    }
  }
  play(id: number){
    this.cajas[id].counting = true;
    this.cajas[id].interval = setInterval(() => {
      --this.cajas[id].countingValue;
      this.displayStringFormer(id);
      if ( this.cajas[id].countingValue < 0){
        this.reset(id);
      }
    }, 1000);
  }
  pause(id: number){
    clearInterval(this.cajas[id].interval);
    this.cajas[id].counting = false;
  }
  reset(id: number){
    this.cajas[id].countingValue = this.cajas[id].timerValue;
    this.displayStringFormer(id);
    this.pause(id);
  }
  delete(id: number){
    this.cajasService.deleteCaja(id);
    this.cajas = this.cajasService.getAllCajas();
  }

  // Drag and drop
  drop(event: CdkDragDrop<string[]>) {
    this.cajasService.moveCajas(event.previousIndex, event.currentIndex);
    this.ngOnInit();
  }

  // Transfomar segundos a hh:mm:ss y viceversa
  displayStringFormer(id: number){
    if (this.cajas[id].countingValue !== null){
      const h = Math.floor(this.cajas[id].countingValue / 3600 );
      const m = Math.floor(this.cajas[id].countingValue % 3600 / 60);
      const s = Math.floor(this.cajas[id].countingValue % 3600 % 60);

      let mm = '';
      let ss = '';
      if ( s < 10 ) { ss = '0' + s; } else { ss = '' + s; }
      if ( m < 10 ) { mm = '0' + m; } else { mm = '' + m; }

      this.cajas[id].displayString = h + ':' + mm + ':' + ss;
    }
  }

}
