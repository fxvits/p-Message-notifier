import { Injectable, Output } from '@angular/core';
import { timer, Observable, Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { IMyMessage, INotification } from './msg.model';

@Injectable()
export class AppService {

  private _currentData: Observable<INotification>;
  private _dataSource: Subject<INotification>;    
  private _timerSubscription: Subscription;
  private _currentIndex: number = -1;
  private _timerSource = timer(0, 5000);
  private _msgList: IMyMessage[]= [];

  private _newNav: string = `
        <div class="p-grid">
          <div class="p-col-fixed">
            <img src="https://www.consilium.europa.eu/images/logo.png" width="32" />
          </div>
        </div>`;

  constructor() { 

      this._dataSource = new Subject<INotification>(); 
      this._currentData = this._dataSource.asObservable();

      const d: Date = new Date();
      for (var i = 0; i < 15; i++) {
        this.createNotification(i, d);
      }
  }

  public startNotifier(): Observable<INotification> {
    if (!this._timerSubscription) {
      this._timerSubscription = this._timerSource.subscribe(x => this.nextNotification());
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
    
    if (this._msgList.length > 0) {

      this._currentIndex += 1;
      if (this._currentIndex >= this._msgList.length) {
        this._currentIndex = 0;
      }

      const currentDate: Date = new Date();
      if (currentDate.getTime() < this._msgList[this._currentIndex].expireOn.getTime()) {
        
        this._dataSource.next(
          <INotification> {
            msg: this._msgList[this._currentIndex],
            count: this._msgList.length
          });

      } else {
        this._msgList.splice(this._currentIndex, 1);
        this._currentIndex -= 1;
        this.nextNotification();
      }
    }
    else
    {
      this._dataSource.next(null);
    }
  }

public prevNotification(): void {
    
    if (this._msgList.length > 0) {

      this._currentIndex -= 1;
      if (this._currentIndex <= 0) {
        this._currentIndex = this._msgList.length-1;
      }
      this._dataSource.next(
          <INotification> {
            msg: this._msgList[this._currentIndex],
            count: this._msgList.length
          });
    }
    else
    {
      this._dataSource.next(null);
    }
  }

  public addNotification(): void {
    const d: Date = new Date();    
    this.createNotification(this._msgList.length, d);
  }
  
  private createNotification(index: number, d: Date): void {
    
    d.setSeconds(d.getSeconds() + 60);
    this._msgList.push(
      <IMyMessage>{
        key: 'key ' + index.toString(),
        data: 'Alert Message ' + index.toString() + ' (expire on:' + d.toLocaleString() + ')' + this._newNav,
        expireOn: d});
     }
}