import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { ToastrAlertService } from '../shared/toastr/toastr.service';
import { toastrMsgServices } from 'src/app/services/toastrMsg.service';
import { elementAt } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective;
  toastrMsg:any;
  option:number = 0;

  constructor( 
    private toastrService: ToastrService, 
    private toastrMsgServices: toastrMsgServices,
    private customToastrService: ToastrAlertService 
  ) { }

  ngOnInit() {
    this.toastrService.overlayContainer = this.toastContainer;
    this.toastrMsgServices.currentToastrMsg$.subscribe((value) => {
      console.log('value---',typeof(value))
      this.toastrMsg = value;
      if(typeof(value) !== 'object'){
        this.customToastrService.commonToastr(this.toastrMsg)
      }
    });
    setTimeout(() => {
      var element = document.getElementById('bgContainer')
      element.classList.remove('slide-left')
      element.classList.remove('slide-right')
    }, 1000);
  }

  emailLogin(value:any){
    console.log(value)
    this.option = value
    var element = document.getElementById('bgContainer')
    element.classList.add('slide-left')
  }
  
  optionClick(value:any) : void{
    this.option = value
  }


}
