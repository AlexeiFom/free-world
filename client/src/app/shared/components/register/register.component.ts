import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Register } from '@app/shared/models/auth/register';
import { ComparePasswords } from '@app/shared/helpers/compare-passwords';
import { Observable } from 'rxjs';
import { LoaderService } from '@app/shared/services/loader.service';
import { AuthService } from '@app/shared/services/auth.service';
import { AuthError } from '@app/shared/models/auth/authError';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  registerForm: FormGroup;
  pass: FormGroup;
  error: AuthError;

  constructor(
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private authService: AuthService,
    private router: Router
  ) {
    this.error = new AuthError(false, '');
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: ['',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ]
      ],
      passwordFormGroup: this.formBuilder.group({
        password: ['',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        confirmPassword: ['',
          [
            Validators.required
          ]
        ]
      },
        {
          validator: ComparePasswords('password', 'confirmPassword')
        })
    });
  }

  get getFormControls() { return this.registerForm.controls; }

  register() {

    this.loaderService.show();

    const model = new Register(
      this.registerForm.get(['firstName']).value,
      this.registerForm.get(['lastName']).value,
      this.registerForm.get(['email']).value,
      this.registerForm.controls.passwordFormGroup.get(['password']).value
    )

    this.authService.register(model)
      .subscribe(data => {
        debugger
        // toDo message Success
        this.loaderService.hide();

        this.router.navigate(['/login']);
      }, error => {
        this.loaderService.hide();

        this.error.message = error.error.message;
        this.error.isError = true;
      })
  }

  closeError() {
    this.error.isError = false;
  }
}
