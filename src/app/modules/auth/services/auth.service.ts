import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize, tap } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { AuthModel } from '../models/auth.model';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/_base/services/ConfigService';
import { HttpClient } from '@angular/common/http';
import { UserProfileDto } from '../models/user-profile';
import { RequestResult } from '../../../_base/models/RequestResult';
import { TenantWithSpotSettingDto } from '../models/tenant-with-spot-setting.model';
import { DetailSpotByTenantIdDto } from '../models/detail-spot-by-tenantId';

export type UserType = UserModel | undefined;

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  // public fields
  currentUser$: Observable<UserType>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserType>;
  isLoadingSubject: BehaviorSubject<boolean>;

  public get currentUserValue(): UserType {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserType) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router,
    private _config: ConfigService,
    private http: HttpClient
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
  }

  // public methods
  login(email: string, password: string): Observable<UserType> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.login(email, password).pipe(
      map((auth: AuthModel) => {
        const result = this.setAuthFromLocalStorage(auth);
        return result;
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  getUserByToken(): Observable<UserType> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.authToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.authHttpService.getUserByToken(auth.authToken).pipe(
      map((user: UserType) => {
        if (user) {
          this.currentUserSubject.next(user);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  getAll(): Observable<UserProfileDto[]> {
    return this.http.get<UserProfileDto[]>(`${this._config.config.auth}User/GetAll`);
}

getCurrentUser(): Observable<UserProfileDto> {
  this.isLoadingSubject.next(true);
  return this.http.get<UserProfileDto>(`${this._config.config.auth}User/GetCurrentUser`).pipe(
    tap(() => {
      this.isLoadingSubject.next(false);
    }));
}

getTenantWithSpotSetting():Observable<TenantWithSpotSettingDto[]>{
  this.isLoadingSubject.next(true);
  return this.http.get<TenantWithSpotSettingDto[]>(`${this._config.config.auth}Tenant/GetTenantsWithSpotSetting`).pipe(
    tap(() => {
      this.isLoadingSubject.next(false);
    }));
}
getDetailSpotByTenantId(tenantId: number):Observable<DetailSpotByTenantIdDto[]>{
  this.isLoadingSubject.next(true);
  return this.http.get<DetailSpotByTenantIdDto[]>(`${this._config.config.auth}Tenant/GetDetailSpotByTenantId?tenantId=${tenantId}`).pipe(
    tap(() => {
      this.isLoadingSubject.next(false);
    }));
}
getTenantById(tenantId: number):Observable<TenantWithSpotSettingDto>{
  this.isLoadingSubject.next(true);
  return this.http.get<TenantWithSpotSettingDto>(`${this._config.config.auth}Tenant/GetById?id=${tenantId}`).pipe(
    tap(() => {
      this.isLoadingSubject.next(false);
    }));
}
  // need create new user then login
  registration(user: UserModel): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.createUser(user).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.login(user.email, user.password)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }

  getUserType(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this._config.config.data}EnumDefinition/GetUserType`
    );
  }

  registerAccount(model: UserProfileDto): Observable<RequestResult> {
    return this.http.post<RequestResult>(
      `${this._config.config.auth}User/Register`,
      model
    );
  }

  // private methods
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.authToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  update(model: UserProfileDto): Observable<RequestResult> {
    return this.http.put<RequestResult>(`${this._config.config.auth}User/Update`, model);
}
changePassword(newPassword: string): Observable<RequestResult> {
  return this.http.put<RequestResult>(`${this._config.config.auth}User/ChangePassword?newPassword=${newPassword}`, null);
}
}
