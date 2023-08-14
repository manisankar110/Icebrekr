import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderInterceptor } from './services/loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({ 
      positionClass: 'inline', 
      preventDuplicates: true,
      autoDismiss: true,
      maxOpened: 1,
      disableTimeOut: true,
    }), // ToastrModule added
    ToastContainerModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: LoaderInterceptor, 
      multi: true 
    },
    {
      provide: LocationStrategy, 
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
