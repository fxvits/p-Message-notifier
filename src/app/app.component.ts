import { Component, VERSION, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message, MessageService } from 'primeng/api';
import { AppService } from './app.service';
import { INotification } from './msg.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [MessageService]
})
export class AppComponent
  implements OnDestroy  {
 
  public isNewDisplayed: boolean = false;
  public notificationCount: number;
  private _notifierSubscription: Subscription;
  
  constructor(
    private _messageService: MessageService,
    private _appService: AppService) {}

  public onStartButtonClicked(): void {
    if (!this._notifierSubscription) {

      this._notifierSubscription = this._appService
        .startNotifier()
        .subscribe((notif: INotification) =>{
          this.displayNotification(notif);
      });
    }
  }

  public onStopButtonClicked(): void {
     this.stop();
  }

  public onNextButtonClicked(): void {
    this._appService.nextNotification();
  }

  public onPreviousButtonClicked(): void {
    this._appService.prevNotification();
  }

  public onAddButtonClicked(): void {
    this._appService.addNotification();
  }
  public displayNotification(notif: INotification): void {

    this.isNewDisplayed = false;
    this._messageService.clear();

    if (notif && notif.msg) {

      this.isNewDisplayed = true;
      this.notificationCount = notif.count;
      this._messageService.add
          (<Message>{
              closable: true,             
              severity: 'info',
              summary:'Service Message',
              detail: notif.msg.data
          });              
    }
  }

  public onManuallyClosed(): void {
    this._appService.nextNotification();
  } 
   
  public ngOnDestroy(): void {
    this.stop();
  } 

  private stop(): void {
    if (this._notifierSubscription) {
      this._appService.stopNotifier();
      this._notifierSubscription.unsubscribe();
      this._notifierSubscription = null;
    } 
  }  
}
