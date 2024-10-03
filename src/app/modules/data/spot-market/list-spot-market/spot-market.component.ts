import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TenantWithSpotSettingDto } from 'src/app/modules/auth/models/tenant-with-spot-setting.model';
import { UserProfileDto } from 'src/app/modules/auth/models/user-profile';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AccountTypeService } from '../../account-type/account-type.service';
import { AccountTypeDto } from '../../account-type/dtos/account-type-dto';
import { AccountService } from '../../account/account.service';
import { SetupSpotMarketComponent } from '../setup-spot-market/setup-spot-market.component';

@Component({
  selector: 'app-spot-market',
  templateUrl: './spot-market.component.html',
  styleUrls: []
})
export class SpotMarketComponent implements OnInit {
  @ViewChild("setupSpotMarket") spotMarket: SetupSpotMarketComponent;
  Model: TenantWithSpotSettingDto[] = [];
  accountType: AccountTypeDto[];
  profiles: UserProfileDto;

  constructor(
    private authService: AuthService,
    private _accountServices: AccountService,
    private _accountTypeServices: AccountTypeService,
    private router: Router
  ) { }
  public get data() {
    return this.Model;
  }
  ngOnInit(): void {

    this.getData();
    this.getTenatWithSpotSetting();
  }
  getData() {
    this._accountTypeServices.getActives().subscribe((result: AccountTypeDto[]) => {
      this.accountType = result;
    });
  }

  getTenatWithSpotSetting() {
    this.authService.getTenantWithSpotSetting().subscribe((result) => {
      this.Model = result;
    });
  }
  viewSetup(accountId: number) {
    this.spotMarket.showSetup(accountId);
  }

  goToDetailSpot(id: number) {
    this.router.navigate([`/data/spot-market/detail-spot-market`], { queryParams: { id } });
  }

  getDetailByAccount(accountTypeId: number): TenantWithSpotSettingDto[] {
    return this.Model.filter(x => x.accountTypeIds.filter(id => id == accountTypeId).length > 0);
  }
}
