import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UserModule } from './modules/user/user.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { IndexLayoutComponent } from './shared/components/layouts/index-layout/index-layout.component';
import { LoginComponent } from './shared/components/login/login.component';
import { IndexComponent } from './shared/components/index/index.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { InterceptorService } from './shared/services/interceptor.service';
import { AuthModalComponent } from './shared/components/modals/auth-modal/auth-modal.component';

import { environment } from '@environment/environment';
import * as firebase from "firebase/app";

firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    IndexLayoutComponent,
    LoginComponent,
    IndexComponent,
    RegisterComponent,
    LoaderComponent,
    AuthModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    FontAwesomeModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [
    InterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }