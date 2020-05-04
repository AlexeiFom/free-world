import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user.routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { UserComponent } from './user.component';
import { HeaderComponent } from './header/header.component';
import { UserLayoutComponent } from '@app/shared/layouts/user-layout/user-layout.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { MedicineComponent } from './medicine/medicine.component';
import { SchedulerEventNavComponent } from './scheduler-event-nav/scheduler-event-nav.component';

@NgModule({
  declarations: [
    UserComponent,
    HeaderComponent,
    UserLayoutComponent,
    SchedulerComponent,
    MedicineComponent,
    SchedulerEventNavComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FontAwesomeModule,
    NgbModule,
    NgbDatepickerModule,
    FormsModule,
  ]
})
export class UserModule { }
