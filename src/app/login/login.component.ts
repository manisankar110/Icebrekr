import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective;
  constructor( private toastrService: ToastrService ) { }

  option:number = 0;
  ngOnInit() {
    this.toastrService.overlayContainer = this.toastContainer;
  }
  
  backClicked(value:any) : void{
    console.log(value)
    this.option = value
  }


}
