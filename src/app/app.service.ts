import { Injectable } from '@angular/core';
import { timer, Observable, Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { IMyMessage } from './msg.model';

@Injectable()
export class AppService {

  private _currentData: Observable<IMyMessage>;
  private _dataSource: Subject<IMyMessage>;    
  private _timerSubscription: Subscription;
  private _currentIndex: number = -1;
  private _timerSource = timer(1000, 2000);
      
  private _msgList: IMyMessage[] = [
    <IMyMessage>{key: '0', data: 'Alert Message 0', expireOn: 1000},
    <IMyMessage>{key: '1', data: 'Alert Message 1', expireOn: 2000},
    <IMyMessage>{key: '2', data: 'Alert Message 2', expireOn: 3000},
    <IMyMessage>{key: '3', data: 'Alert Message 3', expireOn: 4000},
    <IMyMessage>{key: '4', data: 'Alert Message 4', expireOn: 5000},
    <IMyMessage>{key: '5', data: 'Alert Message 5', expireOn: 6000},
    <IMyMessage>{key: '6', data: 'Alert Message 6', expireOn: 7000},
    <IMyMessage>{key: '7', data: 'Alert Message 7', expireOn: 8000},
    <IMyMessage>{key: '8', data: 'Alert Message 8', expireOn: 9000},
    <IMyMessage>{key: '9', data: 'Alert Message 9', expireOn: 10000},
  ];

  constructor() { 
     this._dataSource = new Subject<IMyMessage>(); 
     this._currentData = this._dataSource.asObservable();
  }

  public startNotifier(): Observable<IMyMessage> {
    if (!this._timerSubscription) {
      this._timerSubscription = this._timerSource.subscribe(x => this.triggerNotif(x));
    }
    return this._currentData;
   }

  public stopNotifier(): void {
    if (this._timerSubscription) {
      this._timerSubscription.unsubscribe();
      this._timerSubscription = null;
    }    
  }

  public nextNotification(): void {
    this._currentIndex += 1;
    if (this._currentIndex === this._msgList.length) {
      this._currentIndex = 0;
    }
    this._dataSource.next(this._msgList[this._currentIndex]);
  }

public prevNotification(): void {
    this._currentIndex -= 1;
    if (this._currentIndex <= 0) {
      this._currentIndex = this._msgList.length-1;
    }
    this._dataSource.next(this._msgList[this._currentIndex]);
  }


  private triggerNotif(time: number): void {
    this._currentIndex += 1;
    if (this._currentIndex === this._msgList.length) {
      this._currentIndex = 0;
    }
    this._dataSource.next(this._msgList[this._currentIndex]);
  }
}