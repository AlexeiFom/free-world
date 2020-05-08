import { Injectable, Output, EventEmitter } from '@angular/core';
import { environment } from '@environment/environment';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, of, BehaviorSubject, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AddSchedulerEvent } from '../models/scheduler-event/add-scheduler-event';
import { map } from 'rxjs/operators';

import { ajax } from 'rxjs/ajax';
import { SchedulerEvent } from '../models/scheduler-event/scheduler-event';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  private addEventSubject$ = new Subject<SchedulerEvent>();
  private deleteEventSubject$ = new Subject<string>();

  constructor(private http: HttpClient) { }

  getEvents(): Observable<any> {
    return this.http.get<SchedulerEvent[]>(`${environment.apiUrl}/event/events`)
    .pipe(
      map((resp: Array<SchedulerEvent>) => {
        const events: Array<SchedulerEvent> = [];

        resp.forEach(event => events.push({ _id: event._id, date: event.date, text: event.text, isActive: event.isActive }));

        return events
      })
    )
  }

  addEvent(event) {
    return new Observable(subscriber => {
      this.http.post(`${environment.apiUrl}/event/addEvent`, event)
      .subscribe(response => {
          event._id = response['id']
          this.addEventSubject$.next(event);
        },
          error => {
            console.log(error)
          }
        )
    })
  }

  delete(id: string) {
    return new Observable(subscriber => {
      this.http.post(`${environment.apiUrl}/event/delete`, { id: id })
      .subscribe(response => {
          this.deleteEventSubject$.next(id);
        },
          error => {
            subscriber.error(error);
          }
        )
    })
  }

  deleteEvent$(): Observable<string> {
    return this.deleteEventSubject$.asObservable();
  }

  addEventUpdate$(): Observable<SchedulerEvent> {
    return this.addEventSubject$.asObservable();
  }

}

