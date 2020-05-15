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
  newEvent: AddSchedulerEvent;
  isSelectedTimeError: Boolean;

  isCollapsed = true;

  constructor(calendar: NgbCalendar, private eventService: EventService) {
    this.markedDate = calendar.getToday();
  }

  addNewEvent() {
    const selectedFullTime = this.getSelectedFullTime();

    if (selectedFullTime <= new Date()) {
      this.isSelectedTimeError = true;
      return;
    }

    this.newEvent = new AddSchedulerEvent(selectedFullTime, this.eventText)
    this.isSelectedTimeError = false;

    this.eventService.addEvent(this.newEvent).subscribe(response => {
      this.eventText = undefined;
    },
      error => {
        console.log(error)
      })
  }

  changeTime() {
    this.eventText;

    if (this.markedTime === null) {
      return;
    }
    const selectedFullTime = this.getSelectedFullTime();

    if (selectedFullTime <= new Date()) {
      this.isSelectedTimeError = true;
      return;
    }
    this.isSelectedTimeError = false;
  }

  collapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  setCurrentTime() {
    return { hour: new Date().getHours(), minute: new Date().getMinutes() };
  }

  dateSelect() {
    if (!this.isCollapsed && (this.markedTime !== null && this.markedTime !== undefined)) {
      const selectedFullTime = this.getSelectedFullTime();
      this.isSelectedTimeError = selectedFullTime <= new Date() ? true : false;
    }
    this.eventService.dateSelect(new Date(this.markedDate.year, this.markedDate.month - 1, this.markedDate.day));
  }

  getSelectedFullTime() {
    return new Date(this.markedDate.year,
      this.markedDate.month - 1,
      this.markedDate.day,
      this.markedTime !== null ? this.markedTime['hour'] : '00',
      this.markedTime !== null ? this.markedTime['minute'] : '00');
  }
}
