import { Component, VERSION } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;

  constructor(private _appService: AppService) {}

  public start(): void {
    this._appService.startNotifier();
  }

  public stop(): void {
    this._appService.stopNotifier();
  }

  public next(): void {
    this._appService.nextNotification();
  }

  public previous(): void {
    this._appService.prevNotification();
  }
}
