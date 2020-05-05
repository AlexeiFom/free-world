import { Component, OnInit } from '@angular/core';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-scheduler-event-nav',
  templateUrl: './scheduler-event-nav.component.html',
  styleUrls: ['./scheduler-event-nav.component.scss']
})
export class SchedulerEventNavComponent implements OnInit {
  active: 1;

  constructor() { }

  ngOnInit(): void {
  }

}
