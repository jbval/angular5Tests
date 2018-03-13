import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ResultatsComponent } from './Components/resultats/resultats.component';
import { ResultatsService } from './Services/resultats.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, ResultatsComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [ResultatsService],
  bootstrap: [AppComponent, ResultatsComponent]
})
export class AppModule {}
