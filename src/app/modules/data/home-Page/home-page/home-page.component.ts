import { AuthService } from 'src/app/modules/auth';
import { ModelUserTypeGeneratorFirstLoginComponent } from './../model-user-type-generator-first-login/model-user-type-generator-first-login.component';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AdminProjectRequestService } from 'src/app/modules/admin/project-request/admin-project-request.service';
import { ProjectRequest } from 'src/app/modules/admin/project-request/dtos/project-request';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { AccountService } from '../../account/account.service';
import { AccountDto } from '../../account/dtos/account-dtos';
import { HomePageService } from '../home-page.service';
import { AuthenticationService } from 'src/app/_base/services/authentication.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent extends AppComponentBase implements OnInit {
  @ViewChild("modelUserGenerator") modelUser: ModelUserTypeGeneratorFirstLoginComponent;
  listAccounts: AccountDto[];
  totalProjects: number = 0;
  constructor(
    private _accountService: AccountService,
    private _authService: AuthenticationService
  ) {
    super();
  }

  ngOnInit(): void {
    const accountsRequest = this._accountService.getAll();
    forkJoin([accountsRequest]).subscribe(result => {
      this.listAccounts = result[0];
      if( this._authService.currentUserValue.isFirstLogin)
        this.viewModal();

    })
  }

  setCount(count: number) {
    this.totalProjects = count;
  }

  viewModal() {
    this.modelUser.showModal();
  }

}
