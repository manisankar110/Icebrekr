import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-login-with-email-and-pwd',
  templateUrl: './login-with-email-and-pwd.component.html',
  styleUrls: ['./login-with-email-and-pwd.component.scss']
})
export class LoginWithEmailAndPwdComponent implements OnInit {
  
  @Output() optionselected = new EventEmitter<string>();
  @Input() option:number= 1;



  constructor() { }

  ngOnInit(): void {
  }

  backClicked(value:any): void{
    this.optionselected.next(value)
  }
}
