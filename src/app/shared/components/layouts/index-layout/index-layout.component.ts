import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';
// import { GoogleAuthService } from '@app/shared/services/google-auth.service';

@Component({
  selector: 'app-index-layout',
  templateUrl: './index-layout.component.html',
  styleUrls: ['./index-layout.component.scss']
})
export class IndexLayoutComponent implements OnInit {
  titleText: string;

  constructor(
    // private googleAuthService: GoogleAuthService,
  ) {
  }

  ngOnInit() {
  }

  googleLogin() {
    // this.googleAuthService.login();
  }

}
