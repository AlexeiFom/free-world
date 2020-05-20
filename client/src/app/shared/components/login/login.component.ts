import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '@app/shared/services/auth.service';
import { Login } from '@app/shared/models/auth/login';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LoaderService } from '@app/shared/services/loader.service';
import { Router } from '@angular/router';
import { AuthError } from '@app/shared/models/auth/authError';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  model: Login;
  loginForm: FormGroup;
  error: AuthError;

  constructor(
    private authService: AuthService,
    private loaderService: LoaderService,
    private router: Router) {
    this.error = new AuthError(false, '');

    this.loginForm = new FormGroup({
      email: new FormControl('',
        [
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
          Validators.required,
        ]),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]),
    });
  }

  closeError() {
    this.error.isError = false;
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  login() {
    this.loaderService.show();

    this.model = new Login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value);

    this.authService.login(this.model)
      .subscribe(data => {
        this.loaderService.hide();

        this.router.navigate(['/user']);
      },
        error => {
          this.loaderService.hide();

          this.error.message = error.error.message;
          this.error.isError = true;
        }
      )
  }
}