import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'free-world';

  ngOnInit() {
    debugger;

    let mainModal = document.querySelector('#index-modal-container') as HTMLElement;

    mainModal.className = "main-content";
    // $('.button').click(function(){
    //   var buttonId = $(this).attr('id');
    //   $('#modal-container').removeAttr('class').addClass(buttonId);
    //   $('body').addClass('modal-active');

    // $('#modal-container').click(function(){
    //   $(this).addClass('out');
    //   $('body').removeClass('modal-active');
    // });

  }
}

