import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Register } from '@app/shared/models/auth/register';
import { ComparePasswords } from '@app/shared/helpers/compare-passwords';
import { Observable } from 'rxjs';
import { LoaderService } from '@app/shared/services/loader.service';
import { AuthService } from '@app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  registerForm: FormGroup;
  pass: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private authService: AuthService
  ) { }

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

    setTimeout(() => {
      this.loaderService.hide();
    }, 1000);

    const model = new Register(
      this.registerForm.get(['firstName']).value,
      this.registerForm.get(['lastName']).value,
      this.registerForm.get(['email']).value,
      this.registerForm.controls.passwordFormGroup.get(['password']).value
    )

    this.authService.register(model)
      .subscribe(data => {
        debugger

        this.loaderService.hide();
      }, error => {
        debugger;
      })
  }
}
