import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrAlertService } from 'src/app/shared/toastr/toastr.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { toastrMsgServices } from 'src/app/services/toastrMsg.service';

@Component({
  selector: 'app-login-with-email-and-pwd',
  templateUrl: './login-with-email-and-pwd.component.html',
  styleUrls: ['./login-with-email-and-pwd.component.scss']
})
export class LoginWithEmailAndPwdComponent implements OnInit {
  
  @Output() optionselected = new EventEmitter<string>();
  @Input() option:number= 1;
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective;
  public loginForm:FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    public auth : AuthService,
    private router: Router,
    private toastrService: ToastrService,
    private toastrMsgServices: toastrMsgServices,
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
    this.loginForm = new FormGroup({
      userName : new FormControl(null, [Validators.required, Validators.email]),
      password : new FormControl(null, [Validators.required]),
    });
  }

   /**
   *
   * @param username, password
   * @description Generate access token based on the user input
   */

   authLogin(){
    if (this.loginForm.invalid) {
      console.log(this.loginForm)
      this.toastrMsgServices.setToastrMsg('Please fill all the neccesary details');
      return;
    }

    let loginPayload = {
        "username": this.loginForm.get('userName').value,
        "password": this.loginForm.get('password').value
    }

    const authToken:any = this.auth.loginToken(loginPayload).pipe(finalize(() => authToken.unsubscribe())).subscribe(
      (res: any) => {
          this.toastrMsgServices.setToastrMsg('Logged in successfully');
          this.router.navigateByUrl('/dashboard', { replaceUrl: true });
          this.clearForm();
        }, (error: HttpErrorResponse) => {
        this.toastrMsgServices.setToastrMsg(error.message);
      }
    )

  };

  clearForm(){
    this.loginForm.reset();
  }

  optionClick(value:any): void{
    this.optionselected.next(value)
    this.toastrService.clear();
    if(value == 0){
      var element = document.getElementById('bgContainer')
      element.classList.remove('slide-left')
      element.classList.remove('slide-right')
      element.classList.add('slide-right')
    }else{
      var element = document.getElementById('bgContainer')
      element.classList.remove('slide-left')
      element.classList.remove('slide-right')
      element.classList.add('slide-left')
    }
  }

  forgetPassword(value:any){
    var element = document.getElementById('bgContainer')
    element.classList.add('slide-left')
    // element.classList.remove('slide-right')
  }

}
