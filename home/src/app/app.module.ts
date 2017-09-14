import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdToolbarModule, MdCardModule, MdIconModule, MdSliderModule, MdButtonModule
  , MdSidenavModule, MdListModule, MdTooltipModule, MdGridListModule, MdDialogModule} from '@angular/material';


import {EnSavoirPlusComponent} from './ensavoirplus/ensavoirplus.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent, EnSavoirPlusComponent
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
    MdGridListModule,
    MdDialogModule
  ],
  entryComponents: [EnSavoirPlusComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
