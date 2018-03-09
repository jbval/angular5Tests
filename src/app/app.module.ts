import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ResultatsComponent } from './resultats/resultats.component';


@NgModule({
  declarations: [
    AppComponent,
    ResultatsComponent
  ],
  imports: [
    BrowserModule,
   ],
  providers: [],
  bootstrap: [AppComponent,ResultatsComponent]
})
export class AppModule { }
