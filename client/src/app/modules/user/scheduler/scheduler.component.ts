import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { SchedulerEvent } from '@app/shared/models/scheduler-event/scheduler-event';
import { EventService } from '@app/shared/services/event.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent {
  markedDate: NgbDate;
  isCollapsed = true;
  newEvent = new SchedulerEvent('', '');
  isSelectedTimeError = false;

  constructor(calendar: NgbCalendar, private eventService: EventService) {
    this.markedDate = calendar.getToday();
  }

  addNewEvent() {
    const selectedDateTime = new Date(this.markedDate.year, this.markedDate.month - 1, this.markedDate.day, Number(this.newEvent.date['hour']), Number(this.newEvent.date['minute']))

    if (selectedDateTime <= new Date()) {
      this.isSelectedTimeError = true;
      return;
    }
    this.newEvent.date = selectedDateTime;
    this.isSelectedTimeError = false;
    
    this.eventService.addEvent(this.newEvent);
  }

  collapsed() {
    this.newEvent.date = { hour: new Date().getHours(), minute: new Date().getMinutes() };
    this.isCollapsed = !this.isCollapsed;
  }
}
