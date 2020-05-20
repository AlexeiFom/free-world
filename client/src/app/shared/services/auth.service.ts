import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environment/environment';
import { Register } from '../models/auth/register';
import { Login } from '../models/auth/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(model: Register): Observable<any> {
    return new Observable(subscriber => {

      this.http.post(`${environment.apiUrl}/auth/register`, model)
        .subscribe(data => {
          subscriber.next();
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
          localStorage.setItem('token', data['token'])

          subscriber.next()
        },
          error => {
            subscriber.error(error)
          }
        )
    })
  }
}
