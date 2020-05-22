import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '@app/shared/services/loader.service';
import { AuthService } from '@app/shared/services/auth.service';
import { AuthMessage } from '@app/shared/models/auth/authMessage';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent {
  message: AuthMessage;

  constructor(
    private authService: AuthService,
    private loaderService: LoaderService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.centered = true;

    this.authService.showModal$()
      .subscribe(data => {
        debugger
        this.message = data;

        this.loaderService.hide();

        // const ref = this.modalService.open('ferfegege');
      })
  }

  open(content) {
    debugger
    // this.error.isError = false;
    // this.error.message = 'User was created successfylly';
    // this.error.class.background=''

    // const ref = this.modalService.open(content);
  }

}
