import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { ErroMsgServices } from 'src/services/errormsg.service';

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

  constructor( private toastrService: ToastrService, private erroMsgServices: ErroMsgServices ) { }

  ngOnInit() {
    this.toastrService.overlayContainer = this.toastContainer;
    this.erroMsgServices.currentErrMsg$.subscribe((value) => {
      console.log('value---',typeof(value))
      this.errMsg = value;
      if(typeof(value) !== 'object'){
        this.toastrService.error(this.errMsg)
      }
    });
  }
  
  backClicked(value:any) : void{
    console.log(value)
    this.option = value
  }


}
