import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ErroMsgServices {
    
    private errorMsg$ = new BehaviorSubject<any>({});
    currentErrMsg$ = this.errorMsg$.asObservable();

    constructor() {}

    setErrMsg(msg: any) {
      this.errorMsg$.next(msg);
    }
}