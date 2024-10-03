import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { ConfigService } from './ConfigService';
import { User } from '../models/user';
import { AuthenticateResponse } from '../models/auth/AuthenticateResponse';
import { Auth } from '../models/auth/auth';
import { RequestResult } from '../models/RequestResult';
import { ConfirmFortPassword } from 'src/app/modules/auth/confirm-forgot-password/confirm-forgot-password.component';
import { ConfirmEmail, ConfirmEmailAccountComponent } from 'src/app/modules/auth/components/confirm-email-account/confirm-email-account.component';
import { ProfileDto } from 'src/app/modules/data/profile/dtos/profile-dtos';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

	private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;

	constructor(private http: HttpClient,
		private _config: ConfigService) {
		let obj = localStorage.getItem('currentUser');
		this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(obj ?? JSON.stringify(new User)));
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public get currentUserValue(): User {
		return this.currentUserSubject.value;
	}

	login(userAuth: Auth): Observable<AuthenticateResponse> {
		return this.http.post<AuthenticateResponse>(`${this._config.config.auth}Auth/authenticate`, userAuth);
	}

	loginByToken(token: string): Observable<AuthenticateResponse> {
		return this.http.get<AuthenticateResponse>(`${this._config.config.auth}User/GetByToken?validToken=${token}`);
	}

	auth(user: AuthenticateResponse) {
		let currentUserAuth = new User();
		currentUserAuth.token = user.token;
		currentUserAuth.fullName = user.userAuth.fullName;
		currentUserAuth.firstName = user.userAuth.firstName;
		currentUserAuth.lastName = user.userAuth.lastName;
		currentUserAuth.tenantName = user.userAuth.tenantName;
		currentUserAuth.tenantId = user.userAuth.tenantId;
		currentUserAuth.permissions = user.userAuth.permissions;
		currentUserAuth.expiration = user.userAuth.expiration;
		currentUserAuth.userType = user.userAuth.userType;
		currentUserAuth.identity = user.userAuth.identity;
    currentUserAuth.isFirstLogin = user.userAuth.isFirstLogin;
		localStorage.setItem('currentUser', JSON.stringify(currentUserAuth));
		this.currentUserSubject.next(currentUserAuth);
	}

  updateUserTypeGenerator(): Observable<RequestResult> {
		return this.http.put<RequestResult>(`${this._config.config.auth}User/UpdateUserType`, null)
    .pipe(tap( x => {
      this.currentUserSubject.next({...this.currentUserValue,isFirstLogin : false,userType : 2})
      localStorage.setItem('currentUser', JSON.stringify(this.currentUserValue));

    }));
  }

  updateItFirstLogin(): Observable<RequestResult> {
		return this.http.put<RequestResult>(`${this._config.config.auth}User/UpdateItFirstLogin`, null)
    .pipe(tap( x => {
      this.currentUserSubject.next({...this.currentUserValue,isFirstLogin : false})
      localStorage.setItem('currentUser', JSON.stringify(this.currentUserValue));

    }));
  }

	logout() {
		localStorage.removeItem('currentUser');
		localStorage.removeItem('CONFIGURATIONS');
		localStorage.removeItem('TENANTINFO');
		this.currentUserSubject.next(new User());
	}

	public IsInRole(permission: string): boolean {
		if (!this.currentUserValue)
			return false;
		let permissionUser = this.currentUserValue.permissions;
		return permissionUser.includes(permission);
	}

	public IsInRoleList(permissions?: string[]): boolean {
		if (permissions === null || permissions === undefined || permissions.length <= 0)
			return true;
		return permissions.filter((permission: string) => this.IsInRole(permission)).length > 0;
	}

	forgotPassword(email: string): Observable<RequestResult> {
		return this.http.put<RequestResult>(`${this._config.config.auth}User/ForgotPassword?email=${email}`, null);
	}

	confirmPasswordReset(body: ConfirmFortPassword): Observable<RequestResult> {
		return this.http.post<RequestResult>(`${this._config.config.auth}User/ConfirmForgotPassword`, body);
	}
	confirmEmailAccount(body: ConfirmEmail): Observable<RequestResult> {

		return this.http.post<RequestResult>(`${this._config.config.auth}User/ConfirmEmailAccount`, body);

	}

  getAll(): Observable<ProfileDto[]> {
    return this.http.get<ProfileDto[]>(`${this._config.config.auth}User/GetAll`);
}
  getById(id: number): Observable<ProfileDto> {
    return this.http.get<ProfileDto>(`${this._config.config.auth}User/GetById?id=${id}`)
}
}
