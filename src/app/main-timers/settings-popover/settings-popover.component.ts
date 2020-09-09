import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-popover',
  templateUrl: './settings-popover.component.html',
  styleUrls: ['./settings-popover.component.scss'],
})
export class SettingsPopoverComponent implements OnInit {


  constructor() { }

  ngOnInit() {}

  showPlayPage(event) {
    console.log(event.detail.checked);
  }

}
