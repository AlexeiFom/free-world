import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user.routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NgbDatepickerModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

import { UserComponent } from './user.component';
import { HeaderComponent } from './header/header.component';
import { UserLayoutComponent } from '@app/shared/layouts/user-layout/user-layout.component';
import { SchedulerComponent } from './scheduler/scheduler.component';



@NgModule({
  declarations: [
    UserComponent, 
    HeaderComponent,
    UserLayoutComponent,
    SchedulerComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FontAwesomeModule,
    NgbDatepickerModule
    
  ]
})
export class UserModule { }
