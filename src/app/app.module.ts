import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';

import { AppComponent } from './app.component';
import { AppService } from './app.service';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    ToastModule,

  ],
  declarations: [
    AppComponent
    ],
  bootstrap:    [
    AppComponent
    ],
  providers: [
    AppService
    ]
})
export class AppModule { }
