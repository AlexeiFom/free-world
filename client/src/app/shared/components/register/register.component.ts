import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Register } from '@app/shared/models/auth/register';
import { ComparePasswords } from '@app/shared/helpers/compare-passwords';
import { LoaderService } from '@app/shared/services/loader.service';
import { AuthService } from '@app/shared/services/auth.service';
import { AuthMessage } from '@app/shared/models/auth/authMessage';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthModalComponent } from '../modals/auth-modal/auth-modal.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {}

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
      .subscribe(response => {
        this.loaderService.hide();

        const rusultModal = this.dialog.open(AuthModalComponent,
          {
            data: { title: response, text: 'Please Log In via your creeds.' },
            panelClass: 'success'
          });

        rusultModal.afterClosed().subscribe(() => {
          this.router.navigate(['/login']);
        });
      },
        error => {
          this.loaderService.hide();

          this.dialog.open(AuthModalComponent,
            {
              data: { title: error },
              panelClass: 'error',
            });
        })
  }
}
