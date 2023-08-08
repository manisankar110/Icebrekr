import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrAlertService } from 'src/app/shared/toastr/toastr.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

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
    private toastrService: ToastrService
  ) { }
    

  
  ngOnInit(): void {
    this.toastrService.overlayContainer = this.toastContainer;
    this.initForm();
  }

  initForm(){
    this.loginForm = new FormGroup({
      userName : new FormControl(null, [Validators.required]),
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
      this.toastrService.error('Please fill all the neccesary details')
      return;
    }

    let loginPayload = {
        "username": this.loginForm.get('userName').value,
        "password": this.loginForm.get('password').value
    }

    const authToken:any = this.auth.loginToken(loginPayload).pipe(finalize(() => authToken.unsubscribe())).subscribe(
      (res: any) => {
          // this.toastrService.showSuccess('User successfully loggedIn')
          this.router.navigateByUrl('/dashboard', { replaceUrl: true });
          this.clearForm();
      }, (error: HttpErrorResponse) => {
        // errorAlert(error.message, error.statusText)
        // this.toastrService.showError(error.message);
      }
    )

  };

  clearForm(){
    this.loginForm.reset();
  }


  backClicked(value:any): void{
    this.optionselected.next(value)
  }
}
