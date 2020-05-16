import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UserModule } from './modules/user/user.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { IndexLayoutComponent } from './shared/components/layouts/index-layout/index-layout.component';
import { LoginComponent } from './shared/components/login/login.component';
import { IndexComponent } from './shared/components/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexLayoutComponent,
    LoginComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    FontAwesomeModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
