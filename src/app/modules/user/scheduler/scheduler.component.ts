import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NewEvent } from '@app/shared/models/event/new-event';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent {
  currentDate: NgbDate;
  isCollapsed = true;
  newEvent = new NewEvent('', '');

  constructor(calendar: NgbCalendar) {
    this.currentDate = calendar.getToday();
  }

  addNewEvent() {
    debugger;

  }

  collapsed() {
    if (!this.isCollapsed) {
      this.newEvent.time = { hour: new Date().getHours(), minute: new Date().getMinutes() };
    }
    this.isCollapsed = !this.isCollapsed;
  }
}
