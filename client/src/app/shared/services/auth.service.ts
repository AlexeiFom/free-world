import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environment/environment';
import { Register } from '../models/auth/register';
import { Login } from '../models/auth/login';
import { LoaderService } from './loader.service';
import { AuthMessage } from '../models/auth/authMessage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authModalSubject$ = new Subject<AuthMessage>();
  message: AuthMessage;

  constructor(private http: HttpClient) { }

  register(model: Register): Observable<any> {
    return new Observable(subscriber => {

      this.http.post(`${environment.apiUrl}/auth/register`, model)
        .subscribe(data => {
          this.message = new AuthMessage(false, 'User was created successfully');

          this.authModalSubject$.next(this.message);
          //subscriber.next();
        },
          error => {
            subscriber.error(error);
          }
        )
    })
  }

  login(model: Login): Observable<any> {
    return new Observable(subscriber => {
      this.http.post(`${environment.apiUrl}/auth/login`, model)
        .subscribe(data => {
          debugger

          localStorage.setItem('userInfo', JSON.stringify(data['userInfo']))

          subscriber.next()
        },
          error => {
            subscriber.error(error)
          }
        )
    })
  }

  showModal$(): Observable<AuthMessage> {
    return this.authModalSubject$.asObservable();
  }
}
