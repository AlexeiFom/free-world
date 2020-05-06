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

  addEvent(event) {
    debugger

    this.http.post(`${environment.apiUrl}/event/addEvent`, event)
      .subscribe((next) => {
        debugger;
      },
        (error) => {
          debugger;
        }
      )
    //environment


  }
}

