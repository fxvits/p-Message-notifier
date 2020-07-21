import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import  { MessageModule, MessagesModule } from 'primeng'

import { AppComponent } from './app.component';
import { AppService } from './app.service';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    MessageModule,
    MessagesModule
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
