import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/shared/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index-layout',
  templateUrl: './index-layout.component.html',
  styleUrls: ['./index-layout.component.scss']
})
export class IndexLayoutComponent implements OnInit {
  titleText: string;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit() {

    this.titleText = 'Free World'
    let mainModal = document.querySelector('#index-modal-container') as HTMLElement;

    mainModal.className = "main-content";
  }
}
