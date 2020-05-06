import { Component, OnInit } from '@angular/core';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '@app/shared/services/event.service';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SchedulerEvent } from '@app/shared/models/scheduler-event/scheduler-event';

@Component({
  selector: 'app-scheduler-event-nav',
  templateUrl: './scheduler-event-nav.component.html',
  styleUrls: ['./scheduler-event-nav.component.scss']
})
export class SchedulerEventNavComponent implements OnInit {
  active: 1;
  events: SchedulerEvent[];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(result => {
      this.events = result
    },
      (error) => {
        debugger
      }
    );
    // debugger;
    // this.eventService.getEvents().subscribe(response => {
    //   debugger


    // })
  }

}
