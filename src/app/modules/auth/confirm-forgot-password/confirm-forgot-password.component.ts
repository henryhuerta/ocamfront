import { filter } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first, Observable, Subscription } from 'rxjs';
import { RequestResult } from 'src/app/_base/models/RequestResult';
import { AuthenticationService } from 'src/app/_base/services/authentication.service';
import { AuthService } from '../services/auth.service';

export interface ConfirmFortPassword {
  token: string;
    id: string;
    newPassword: string;
}

@Component({
  selector: 'app-confirm-forgot-password',
  templateUrl: './confirm-forgot-password.component.html',
  styleUrls: ['./confirm-forgot-password.component.scss']
})
export class ConfirmForgotPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  isLoading$: Observable<boolean>;
  public id: string;
  private token: string;
  public errorToken: boolean;


  // private fields
  private unsubscribe: Subscription[] = [];
  constructor(private fb: FormBuilder, private authService: AuthService,
    private _autenticationService: AuthenticationService,
    private _route: ActivatedRoute,
    private _router: Router
    ) {
    this.isLoading$ = this.authService.isLoading$;
  }


  ngOnInit(): void {
    this.initForm();
    this.intialize();
  }

  intialize(){
    this._route.queryParams
    .subscribe(params => {
      this.id = encodeURIComponent(params.id);
      this.token = encodeURIComponent( params.token);
      if(!this.id || !this.token) {
        this.errorToken = true;
      }
    });

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.resetPasswordForm.controls;
  }

  initForm() {
    this.resetPasswordForm = this.fb.group({
      password: [
        '',
        Validators.compose([
          Validators.required
        ]),
      ],
    });
  }
  confirmNewPassword(){
    const body: ConfirmFortPassword = {
      token: this.token,
      id: this.id,
      newPassword: this.f.password.value
    }
    this._autenticationService.confirmPasswordReset(body).subscribe(_ => {
      this._router.navigate(["/auth/login"]).then();
    });
  }

}
