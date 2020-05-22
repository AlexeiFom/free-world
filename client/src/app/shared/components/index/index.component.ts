import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  titleText: string;

  constructor() { }

  ngOnInit(): void {
    this.titleText = 'Free World'
    let mainModal = document.querySelector('#index-modal-container') as HTMLElement;

    mainModal.className = "main-content";
  }
}
