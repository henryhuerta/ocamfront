import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/_base/services/authentication.service';
import { AuthService } from '../../services/auth.service';
import { concatMap, Observable } from 'rxjs';

export interface ConfirmEmail {

  token: string;

  id: string;


}

@Component({
  selector: 'app-confirm-email-account',
  templateUrl: './confirm-email-account.component.html',
  styleUrls: ['./confirm-email-account.component.scss']
})
export class ConfirmEmailAccountComponent implements OnInit {
public id: string;
// public @ViewChild("error") error = Htt

private token: string;

public errorToken: boolean = false;
isLoading$: Observable<boolean>;
goToLogin() {
  this.router.navigate(["/auth/login"]).then()
}


  constructor(
    private authService: AuthService,
    private _autenticationService: AuthenticationService,
    private _route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoading$ = this.authService.isLoading$;
    this.intialize();
  }

  intialize(){

    this._route.queryParams.pipe(concatMap((params: Params) => {
      this.id = encodeURIComponent(params.id);

      this.token = encodeURIComponent( params.token);


      const body: ConfirmEmail = {id: this.id,token: this.token}

      return this._autenticationService.confirmEmailAccount( body)

    }))

    .subscribe(response => {
      if(response.success)
        this.errorToken = true;

    });

  }

}
