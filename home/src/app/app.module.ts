import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdToolbarModule, MdCardModule, MdIconModule, MdSliderModule, MdButtonModule
  , MdSidenavModule, MdListModule, MdTooltipModule, MdGridListModule} from '@angular/material';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdCardModule,
    MdIconModule,
    MdSliderModule,
    MdButtonModule,
    MdSidenavModule,
    MdListModule,
    MdTooltipModule,
    MdGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
