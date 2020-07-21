import { Component, VERSION } from '@angular/core';
import { Message } from 'primeng/api';
import { AppService } from './app.service';
import { IMyMessage } from './msg.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent  {
 
  public  msgs: Message[] = [];

  constructor(private _appService: AppService) {}

  public start(): void {
    this._appService
    .startNotifier()
    .subscribe((msg: IMyMessage) =>{
      this.displayNotification(msg);
    });
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

  public displayNotification(msg: IMyMessage): void {
    if (msg) {
      console.log(msg.data);
      this.msgs = [];
      this.msgs.push(
        {
          severity:'info',
          summary:'News',
          detail: msg.data
        });
    }
  }
}
