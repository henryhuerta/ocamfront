import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_base/services/authentication.service';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { AuthModel } from '../../models/auth.model';
import { Auth } from 'src/app/_base/models/auth/auth';
import { User } from 'src/app/_base/models/user';
import { AuthenticateResponse } from 'src/app/_base/models/auth/AuthenticateResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends AppComponentBase implements OnInit, OnDestroy {
  // KeenThemes mock, change it to:
  // defaultAuth: any = {
  //   email: 'admin@demo.com',
  //   password: 'demo',
  // };
  loginForm: FormGroup;
  hasError: boolean;
  returnUrl: string;
  isLoading$: Observable<boolean>;

  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private _authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
    // this.isLoading$ = this._authenticationService.isLoading$;
    // redirect to home if already logged in
    if (!this.isEmptyOrNullString(this._authenticationService.currentUserValue.token)) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'.toString()] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: [
        "",
        Validators.compose([
          // Validators.required,
          // Validators.email,
          Validators.minLength(3),
          Validators.maxLength(320), // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        ]),
      ],
      password: [
        "",
        Validators.compose([
          // Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  submit() {
    this.hasError = false;
    let auth = new Auth();
    auth.username = this.f.email.value;
    auth.password = this.f.password.value;

    const loginSubscr = this._authenticationService
      .login(auth)
      .pipe(first())
      .subscribe((user: AuthenticateResponse) => {
        if (user && user.success) {
          this._authenticationService.auth(user);
          this.router.navigate(['/data/home-page']);
        } else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(loginSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
