import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ErroMsgServices } from 'src/services/errormsg.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  @Output() optionselected = new EventEmitter<string>();
  public resetLinkStatus:any;
  public interval;
  public timeLeft: number = 0;

  constructor(private erroMsgServices: ErroMsgServices) { }

  ngOnInit(): void {
  }

  backClicked(value:any): void{
    this.optionselected.next(value)
  }

  submitResetLink(){
    this.timeLeft = 20;
    this.erroMsgServices.setErrMsg('Enter valid Mail ID');

    this.resetLinkStatus = {
      msg: 'We have sent a reset link to your email',
      status: 1
    }
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 0;
        clearInterval(this.interval);
        this.resetLinkStatus = null
      }
    },1000)
  }

}
