import { AuthService } from 'src/app/modules/auth';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { Component, Input, OnInit } from '@angular/core';
import { AccountDto } from 'src/app/modules/data/account/dtos/account-dtos';
import { ProjectRequest } from 'src/app/modules/admin/project-request/dtos/project-request';
import { AccountService } from 'src/app/modules/data/account/account.service';
import { AdminProjectRequestService } from 'src/app/modules/admin/project-request/admin-project-request.service';
import { forkJoin, Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/_base/services/authentication.service';
import { UserProfileDto } from 'src/app/modules/auth/models/user-profile';
import { ProfileDto } from '../dtos/profile-dtos';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends AppComponentBase implements OnInit {
  Model: ProfileDto = new ProfileDto();
  profiles: UserProfileDto = new UserProfileDto();
  listAccounts: AccountDto[] = [] = [];
  totalCertificates: number;
  totalProjects: number = 0;
  isLoading$: Observable<boolean>;

  constructor(
    private _accountService: AccountService,
    private auth: AuthService
  ) {
    super();
  }

  divResumen: boolean = true;
  divPerfil: boolean = false;

  divResumenFunction() {
    this.divResumen = true;
    this.divPerfil = false;
  }

  divPerfilFunction() {
    this.divPerfil = true;
    this.divResumen = false;
  }

  ngOnInit(): void {
    this.divResumenFunction();
    const accountsRequest = this._accountService.getAll();
    const currentUser = this.auth.getCurrentUser();
    forkJoin([accountsRequest, currentUser]).subscribe(result => {
      this.listAccounts = result[0];
      this.profiles = result[1];
      this.totalCertificates = this.listAccounts.reduce((accumulator, object) => {
        return accumulator + object?.totalCertificates;
      }, 0);
    });
  }

  setCount(count: number) {
    this.totalProjects = count;
  }

}
