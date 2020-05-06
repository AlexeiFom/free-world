import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SchedulerEvent } from '../models/scheduler-event/scheduler-event';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class EventService {
  result: any;
  eventsList: any;

  constructor(private http: HttpClient) { }


  getEvents(): Observable<SchedulerEvent[]> {
    return this.http.get<SchedulerEvent[]>(`${environment.apiUrl}/event/events`)
  }


  // getEvents(): Observable<SchedulerEvent> {
  //   debugger
  //   return new Observable(subscriber => {
  //     this.http.get(`${environment.apiUrl}/event/events`)
  //       .subscribe(result => {

  //         const eeee = result.map(() =>)


  //         subscriber.next(result)
  //       })
  //   });
  // }


  addEvent(event) {
    debugger

    //environment


  }
}

