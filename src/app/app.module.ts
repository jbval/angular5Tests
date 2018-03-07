import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AgGridModule} from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { ResultatsComponent } from './resultats/resultats.component';


@NgModule({
  declarations: [
    AppComponent,
    ResultatsComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([/*optional Angular Components to be used in the grid*/])
  ],
  providers: [],
  bootstrap: [AppComponent,ResultatsComponent]
})
export class AppModule { }
