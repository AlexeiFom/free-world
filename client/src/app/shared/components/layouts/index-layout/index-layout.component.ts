import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-layout',
  templateUrl: './index-layout.component.html',
  styleUrls: ['./index-layout.component.scss']
})
export class IndexLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let mainModal = document.querySelector('#index-modal-container') as HTMLElement;

    mainModal.className = "main-content";
  }

}
