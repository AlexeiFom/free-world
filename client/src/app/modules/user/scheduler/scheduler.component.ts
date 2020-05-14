import { Component, OnInit, Input } from '@angular/core';
import { NgbCalendar, NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { AddSchedulerEvent } from '@app/shared/models/scheduler-event/add-scheduler-event';
import { EventService } from '@app/shared/services/event.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent {
  markedDate: NgbDate;
  markedTime: Object;
  eventText: string;
  isCollapsed = true;

  newEvent: AddSchedulerEvent;
  isSelectedTimeError = false;

  constructor(calendar: NgbCalendar, private eventService: EventService) {
    this.markedDate = calendar.getToday();
    this.markedTime = this.setCurrentTime();
  }

  addNewEvent() {
    const selectedFullTime = new Date(this.markedDate.year, this.markedDate.month - 1, this.markedDate.day, this.markedTime['hour'], this.markedTime['minute']);

    if (selectedFullTime <= new Date()) {
      this.isSelectedTimeError = true;
      return;
    }
    this.newEvent = new AddSchedulerEvent(selectedFullTime, this.eventText)
    this.isSelectedTimeError = false;

    this.eventService.addEvent(this.newEvent).subscribe(response => {
      debugger
      this.eventText = '';
    },
      error => {
        console.log(error)
      })
  }

  collapsed() {
    if (this.isCollapsed) {
      this.markedTime = this.setCurrentTime();
    }
    this.isCollapsed = !this.isCollapsed;
  }

  setCurrentTime() {
    return { hour: new Date().getHours(), minute: new Date().getMinutes() };
  }

  dateSelect() {
    this.eventService.dateSelect(new Date(this.markedDate.year, this.markedDate.month - 1, this.markedDate.day));
  }
}
