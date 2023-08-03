import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  @Output() optionselected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  backClicked(value:any): void{
    this.optionselected.next(value)
  }

}
