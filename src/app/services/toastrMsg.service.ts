import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class toastrMsgServices {
    
    private toastrMsg$ = new BehaviorSubject<any>({});
    currentToastrMsg$ = this.toastrMsg$.asObservable();

    constructor() {}

    setToastrMsg(msg: any) {
      this.toastrMsg$.next(msg);
    }
}