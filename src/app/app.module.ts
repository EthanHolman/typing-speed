import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpeedTestModule } from './modules/speed-test/speed-test.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SpeedTestModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
