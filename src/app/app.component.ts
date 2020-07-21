import { Component, VERSION, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message, MessageService } from 'primeng/api';
import { AppService } from './app.service';
import { IMyMessage } from './msg.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MessageService]
})
export class AppComponent
  implements OnDestroy  {
 
  public  msgs: Message[] = [];
  private _notifierSubscription: Subscription;

  constructor(
    private _messageService: MessageService,
    private _appService: AppService) {}

  public start(): void {
    if (!this._notifierSubscription) {

      this._notifierSubscription = this._appService
        .startNotifier()
        .subscribe((msg: IMyMessage) =>{
          this.displayNotification(msg);
      });
    }
  }

  public stop(): void {
    if (this._notifierSubscription) {
      this._appService.stopNotifier();
      this._notifierSubscription.unsubscribe();
      this._notifierSubscription = null;
    }  
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
      this._messageService.add
                    (<Message>{
                        key: msg.key,
                        sticky: (msg.expireOn > 0 ? false : true),
                        life: (msg.expireOn > 0 ? msg.expireOn : null),
                        closable: true,
                        severity: 'info',
                        detail: msg.data
                    });

      // TODO Remove once Life property will be available for p-Messages
      if (msg.expireOn > 0) {
          setTimeout(() => {
              this._messageService.clear(msg.key);
          }, (msg.expireOn > 0 ? msg.expireOn : 5000)); // life = 5000ms as default
      }                    
    }
  }
    
  public ngOnDestroy(): void {
    this.stop();
  } 
  
}
