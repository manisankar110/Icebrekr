import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWithEmailAndPwdComponent } from './login-with-email-and-pwd.component';

describe('LoginWithEmailAndPwdComponent', () => {
  let component: LoginWithEmailAndPwdComponent;
  let fixture: ComponentFixture<LoginWithEmailAndPwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginWithEmailAndPwdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWithEmailAndPwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
