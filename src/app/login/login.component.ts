import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  option:number = 0;

  ngOnInit(): void {
  }

  backClicked(value:any) : void{
    console.log(value)
    this.option = value
  }


}
