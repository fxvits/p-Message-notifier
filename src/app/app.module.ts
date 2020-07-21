import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppService } from './app.service';

@NgModule({
  imports:      [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
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
