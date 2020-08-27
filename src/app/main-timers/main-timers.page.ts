import { Component, OnInit } from '@angular/core';
import { Caja } from './caja.model';
import { CajasService } from './cajas.service';
import { AlertController } from '@ionic/angular';

import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';

@Component({
  selector: 'app-main-timers',
  templateUrl: './main-timers.page.html',
  styleUrls: ['./main-timers.page.scss'],
})
export class MainTimersPage implements OnInit {
  cajas: Caja[];
  json = [];
  cajasService: CajasService;

  constructor( public alertController: AlertController) {}

  ngOnInit() {
    this.cajasService.getObjects().then( _ => {
    this.cajas = this.cajasService.getAllCajas();
    });
  }

  async createCajaAlert(){
      const alert = await this.alertController.create({
        header: 'Create new Timer',
        message: 'Insert the value of the timer in seconds',
        inputs: [
          {
            name: 'name',
            type: 'text',
            placeholder: 'MyTimerName'
          },
          {
            name: 'time',
            type: 'number',
            placeholder: '15'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Create',
            handler: (data) => {
              this.cajasService.addCaja(data.name, parseInt(data.time,10));
              this.ngOnInit();
            }
          }
        ]
      });

      await alert.present();
  }

  // startTimer(duration, display) {

  //     let timer = duration;
  //     setInterval(function () {
  //       let  minutes = parseInt(timer / 60, 10);
  //       let  seconds = parseInt(timer % 60, 10);

  //         minutes = minutes < 10 ? "0" + minutes : minutes;
  //         seconds = seconds < 10 ? "0" + seconds : seconds;

  //         display.textContent = minutes + ":" + seconds;

  //         if (--timer < 0) {
  //             timer = duration;
  //         }
  //     }, 1000);
  //     <body>
  //     <div>Registration closes in <span id="time">05:00</span> minutes!</div>
  //     </body>

  // }


}
