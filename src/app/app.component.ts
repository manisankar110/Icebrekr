import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { filter, finalize } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { toastrMsgServices } from './services/toastrMsg.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'icebreakr-UI';
  isLoading: boolean = false; 
  public routeSubscribe: any;

  constructor(
    private router: Router,
    private cdRef : ChangeDetectorRef,
    private loaderService: LoaderService,  
    private toastrMsgServices: toastrMsgServices,
  ) {}
    
  ngOnInit(): void {
    this.routeSubscribe = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.toastrMsgServices.setToastrMsg({});
    });
  }

  ngAfterViewInit() {
    const sub = this.loaderService.isLoading
    .pipe(finalize(() => sub.unsubscribe())).subscribe((res) => {
      this.isLoading = res
      this.cdRef.detectChanges();
    })  
  }
}
