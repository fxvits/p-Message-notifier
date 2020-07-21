import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { IMyMessage } from './msg.model';

@Injectable()
export class AppService {

  public currentData;

  private _dataSource: BehaviorSubject<IMyMessage>;  
  private _timerSource = timer(1000, 2000);
  private _timerSubscription;
  private _currentIndex: number = -1;

  private _msgList: IMyMessage[] = [
    <IMyMessage>{data: 'Alert Message 0', expireOn: 1},
    <IMyMessage>{data: 'Alert Message 1', expireOn: 1},
    <IMyMessage>{data: 'Alert Message 2', expireOn: 1},
    <IMyMessage>{data: 'Alert Message 3', expireOn: 1},
    <IMyMessage>{data: 'Alert Message 4', expireOn: 1},
    <IMyMessage>{data: 'Alert Message 5', expireOn: 1},
    <IMyMessage>{data: 'Alert Message 6', expireOn: 1},
    <IMyMessage>{data: 'Alert Message 7', expireOn: 1},
    <IMyMessage>{data: 'Alert Message 8', expireOn: 1},
    <IMyMessage>{data: 'Alert Message 9', expireOn: 1},
  ];

  constructor() { 
     this.currentData = this._dataSource.asObservable();
     this._dataSource = new BehaviorSubject<IMyMessage>(null); 
  }

  public startAlerter(): void {
    if (!this._timerSubscription) {
      this._timerSubscription = this._timerSource.subscribe(x => this.triggerAlert(x));
    }
   }

  public stopAlerter(): void {
    if (this._timerSubscription) {
      this._timerSubscription.unsubscribe();
    }
  }

  public triggerAlert(time: number): void {
    this._currentIndex += 1;
    if (this._currentIndex === this._msgList.length) {
      this._currentIndex = 0;
    }
    this._dataSource.next(this._msgList[this._currentIndex]);
  }
}