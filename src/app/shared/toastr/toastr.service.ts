import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr'

@Injectable({
    providedIn: 'root'
})

export class ToastrAlertService {
    constructor(public toastr: ToastrService) { }

    showSuccess(msg) {
        this.toastr.success('', msg, {
            timeOut: 3000,
        });
    }

    showError(msg) {
        this.toastr.error('', msg, {
            timeOut: 3000, 
        });
    }

    showInfo(msg) {
        this.toastr.info('', msg, {
            timeOut: 3000,
        });
    }

    showWarning(msg) {
        this.toastr.warning('', msg, {
            timeOut: 3000,
        });
    }

}
