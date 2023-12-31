import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { toastrMsgServices } from 'src/app/services/toastrMsg.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  @Output() optionselected = new EventEmitter<string>();
  public resetEmailForm:FormGroup;
  public resetLinkStatus:any;
  public interval;
  public timeLeft: number = 0;

  constructor(
    private toastrMsgServices: toastrMsgServices,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.toastrService.clear();
    setTimeout(() => {
      var element = document.getElementById('bgContainer')
      element.classList.remove('slide-left')
      element.classList.remove('slide-right')
    }, 1000);
  }

  initForm(){
    this.resetEmailForm = new FormGroup({
      resetEmail : new FormControl({value: null,  disabled : false}, [Validators.required, Validators.email]),
    });
  }

  optionClick(value:any): void{
    this.toastrService.clear();
    this.optionselected.next(value)
    var element = document.getElementById('bgContainer')
    element.classList.remove('slide-right')
    element.classList.remove('slide-left')
    element.classList.add('slide-right')
  }

  submitResetLink(){
    if (this.resetEmailForm.invalid) {
      this.toastrMsgServices.setToastrMsg('Please fill all the neccesary details');
      return;
    }
    
    this.toastrService.clear();
    this.timeLeft = 20;
    this.resetLinkStatus = {
      msg: 'We have sent a reset link to your email',
      status: 1
    }
    // this.toastrMsgServices.setToastrMsg(this.resetLinkStatus?.msg);
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
      this.resetEmailForm.controls['resetEmail'].disable()
        this.timeLeft--;
      } else {
        this.timeLeft = 0;
        this.resetEmailForm.controls['resetEmail'].enable()
        clearInterval(this.interval);
        this.resetLinkStatus = null
        // this.toastrService.clear()
      }
    },1000)
  }

}
