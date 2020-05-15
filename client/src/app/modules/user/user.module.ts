import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user.routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UserLayoutComponent } from '@app/shared/components/layouts/user-layout/user-layout.component';
import { SchedulerEventNavComponent } from '@app/shared/components/user/scheduler-event-nav/scheduler-event-nav.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { HeaderComponent } from '@app/shared/components/user/header/header.component';
import { MedicineComponent } from './medicine/medicine.component';
import { SchedulerEventTableComponent, NgbdSortableHeader } from '@app/shared/components/user/scheduler-event-table/scheduler-event-table.component';

@NgModule({
  declarations: [
    HeaderComponent,
    UserLayoutComponent,
    SchedulerComponent,
    MedicineComponent,
    SchedulerEventNavComponent,
    SchedulerEventTableComponent,
    NgbdSortableHeader
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FontAwesomeModule,
    NgbModule,
    NgbDatepickerModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [SchedulerEventTableComponent],
  bootstrap: [SchedulerEventTableComponent]
})
export class UserModule { }
