import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Register } from '@app/shared/models/auth/register';
import { ComparePasswords } from '@app/shared/helpers/compare-passwords';
import { LoaderService } from '@app/shared/services/loader.service';
import { AuthService } from '@app/shared/services/auth.service';
import { AuthMessage } from '@app/shared/models/auth/authMessage';
import { Router } from '@angular/router';
// import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  registerForm: FormGroup;
  pass: FormGroup;
  message: AuthMessage;

  constructor(
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private authService: AuthService,
    private router: Router,
    // config: NgbModalConfig,
    // private modalService: NgbModal
  ) {
    this.message = new AuthMessage(false, '');
    // config.backdrop = 'static';
    // config.keyboard = false;
    // config.centered = true;
  }

//   open(content) {
//     this.error.isError = false;
//     this.error.message = 'User was created successfylly';
// // this.error.class.background=''

//     const ref = this.modalService.open(content);
//   }

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
        // this.loaderService.hide();

        // this.router.navigate(['/login']);
      }, error => {
        // this.loaderService.hide();

        // this.error.message = error.error.message;
        // this.error.isError = true;
      })
  }

  closeError() {
    this.message.isError = false;
  }
}
