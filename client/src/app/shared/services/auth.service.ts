import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { Register } from '../models/auth/register';
import { Login } from '../models/auth/login';
import { AuthMessage } from '../models/auth/authMessage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  register(model: Register): Observable<any> {
    return new Observable(subscriber => {
      this.http.post(`${environment.apiUrl}/auth/register`, model)
        .subscribe(data => {
          subscriber.next(data['message']);
        },
          error => {
            subscriber.error(error.error['message'] ? error.error['message'] : error['statusText']);
          }
        )
    })
  }

  login(model: Login): Observable<any> {
    return new Observable(subscriber => {
      this.http.post(`${environment.apiUrl}/auth/login`, model)
        .subscribe(data => {
          localStorage.setItem('userInfo', JSON.stringify(data['userInfo']))
          subscriber.next()
        },
          error => {
            subscriber.error(error)
          }
        )
    })
  }

  isAuthenticated(): boolean {
    const token = JSON.parse(localStorage.getItem('userInfo'))?.['token'];
    return token ? true : false;
  }
}
