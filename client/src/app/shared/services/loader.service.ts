import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loaderSubject$ = new Subject<boolean>();
  loaderShow$ = this.loaderSubject$.asObservable();

  constructor() { }

  show() {
    this.loaderSubject$.next(true);
  }

  hide() {
    this.loaderSubject$.next(false);
  }
}
