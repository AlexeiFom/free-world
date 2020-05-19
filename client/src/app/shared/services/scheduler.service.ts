import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject} from 'rxjs';

import { SchedulerEvent } from '../models/scheduler-event/scheduler-event';

@Injectable({
  providedIn: 'root'
})

export class SchedulerService {

  private addEventSubject$ = new Subject<SchedulerEvent>();
  private deleteEventSubject$ = new Subject<string>();
  private dateSelectSubject$ = new Subject<Date>();

  constructor(private http: HttpClient) { }

  async getEvents(): Promise<SchedulerEvent[]> {
    return await this.http.get<SchedulerEvent[]>(`${environment.apiUrl}/scheduler/events`).toPromise();
  }

  checkActiveEvents(events: SchedulerEvent[]) {
    events.forEach((item) => {
      if (new Date(item.date.toString()) <= new Date()) {
        item.isActive = false;
      }
    })
    return events;
  }

  sortByDate(events: SchedulerEvent[]){
    events.sort((a,b)=>{
      return <any>new Date(b.date.toString()) - <any>new Date(a.date.toString());
    })
    return events;
  }

  addEvent(event) {
    return new Observable(subscriber => {
      this.http.post(`${environment.apiUrl}/scheduler/addEvent`, event)
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
      this.http.post(`${environment.apiUrl}/scheduler/delete`, { id: id })
        .subscribe(response => {
          this.deleteEventSubject$.next(id);
        },
          error => {
            subscriber.error(error);
          }
        )
    })
  }

  dateSelect(date) {
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

