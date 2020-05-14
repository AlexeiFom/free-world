import { Injectable, Output, EventEmitter } from '@angular/core';
import { environment } from '@environment/environment';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, of, BehaviorSubject, Subject, interval } from 'rxjs';
import { map, timeout } from 'rxjs/operators';

import { SchedulerEvent } from '../models/scheduler-event/scheduler-event';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  private addEventSubject$ = new Subject<SchedulerEvent>();
  private deleteEventSubject$ = new Subject<string>();
  private dateSelectSubject$ = new Subject<Date>();

  constructor(private http: HttpClient) { }

  async getEvents(): Promise<SchedulerEvent[]> {
    return this.http.get<SchedulerEvent[]>(`${environment.apiUrl}/event/events`).toPromise();
  }

  addEvent(event) {
    return new Observable(subscriber => {
      debugger
      this.http.post(`${environment.apiUrl}/event/addEvent`, event)
        .subscribe(response => {
          event._id = response['id'];
          this.addEventSubject$.next(event);
          subscriber.next();
        },
          error => {
            console.log(error);
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

  dateSelect(date){
    this.dateSelectSubject$.next(date);
  }

  deleteEvent$(): Observable<string> {
    return this.deleteEventSubject$.asObservable();
  }

  addEventUpdate$(): Observable<SchedulerEvent> {
    return this.addEventSubject$.asObservable();
  }

  dateSelect$(): Observable<Date> {
    return this.dateSelectSubject$.asObservable();
  }

}

