import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';

import { AppComponent } from './app.component';
import { AppService } from './app.service';

@NgModule({
  imports:      [
    BrowserModule,
    BrowserAnimationsModule,
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
