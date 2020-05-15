import { Component, OnInit } from '@angular/core';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '@app/shared/services/event.service';
import { SchedulerEvent } from '@app/shared/models/scheduler-event/scheduler-event';
import { timeout } from 'rxjs/operators';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-scheduler-event-nav',
  templateUrl: './scheduler-event-nav.component.html',
  styleUrls: ['./scheduler-event-nav.component.scss']
})
export class SchedulerEventNavComponent implements OnInit {
  active: 1;
  allEvents = new Array<SchedulerEvent>();
  forPerDayEvents = new Array<SchedulerEvent>();

  constructor(private eventService: EventService) { }

  async ngOnInit() {
    await this.eventService.getEvents()
      .then(response => {
          const currentDate = new Date();
          this.eventService.checkActiveEvents(response);
          this.allEvents = this.eventService.sortByDate(response);
          this.getEventsPerDay(currentDate);
      },
        error => {
          console.log(error);
        }
      );

    this.eventService.addEventUpdate$().subscribe(response => {
      this.allEvents.push(response);
      this.eventService.sortByDate(this.allEvents);
      this.getEventsPerDay(response.date);
    });

    this.eventService.deleteEvent$().subscribe(response => {
      let fromAllEventsIndex = this.allEvents.indexOf(this.allEvents.find(x => x._id === response), 0);
      this.allEvents.splice(fromAllEventsIndex, 1);

      let fromPerDayEventsIndex = this.forPerDayEvents.indexOf(this.forPerDayEvents.find(x => x._id === response), 0);
      this.forPerDayEvents.splice(fromPerDayEventsIndex, 1);
    })

    this.eventService.dateSelect$().subscribe(selectedDate => {
      this.getEventsPerDay(selectedDate);
    })
  }

  compareDates(currentDate, eventDate) {
    return currentDate.getFullYear() == eventDate.getFullYear() &&
      currentDate.getMonth() == eventDate.getMonth() &&
      currentDate.getDate() == eventDate.getDate() ? true : false;
  }

  getEventsPerDay(selectedDate) {
    this.forPerDayEvents.splice(0, this.forPerDayEvents.length);

    this.allEvents.forEach((elem) => {
      if (this.compareDates(selectedDate, new Date(elem.date.toString()))) {
        return this.forPerDayEvents.push(elem);
      }
    })
  }
}
