import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { ErroMsgServices } from 'src/services/errormsg.service';
import { ToastrAlertService } from '../shared/toastr/toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective;
  errMsg:any;
  option:number = 0;

  constructor( 
    private toastrService: ToastrService, 
    private erroMsgServices: ErroMsgServices,
    private customToastrService: ToastrAlertService 
  ) { }

  ngOnInit() {
    this.toastrService.overlayContainer = this.toastContainer;
    this.erroMsgServices.currentErrMsg$.subscribe((value) => {
      console.log('value---',typeof(value))
      this.errMsg = value;
      if(typeof(value) !== 'object'){
        this.customToastrService.commonToastr(this.errMsg)
      }
    });
  }
  
  backClicked(value:any) : void{
    console.log(value)
    this.option = value
  }


}
