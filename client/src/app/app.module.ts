import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from './app.component';
import { IndexLayoutComponent } from './shared/layouts/index-layout/index-layout.component';
import { UserModule } from './modules/user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    IndexLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }