import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  email: string;

  constructor(private router: Router) {
    this.email = JSON.parse(localStorage.getItem('userInfo'))?.email;
  }


  logout() {
    localStorage.removeItem('userInfo');

    this.router.navigate(['login']);
  }
}
