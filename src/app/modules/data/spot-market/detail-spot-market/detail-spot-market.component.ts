import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailSpotByTenantIdDto } from 'src/app/modules/auth/models/detail-spot-by-tenantId';
import { TenantWithSpotSettingDto } from 'src/app/modules/auth/models/tenant-with-spot-setting.model';
import { UserProfileDto } from 'src/app/modules/auth/models/user-profile';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { OperationsService } from 'src/app/modules/opr/operation/operations.service';
import { TransferCertificateDto } from 'src/app/modules/opr/operation/transfer-certificates/dtos/transfer-certificates-dto';

@Component({
  selector: 'app-detail-spot-market',
  templateUrl: './detail-spot-market.component.html',
  styleUrls: []
})
export class DetailSpotMarketComponent implements OnInit {
  Model:UserProfileDto = new UserProfileDto();
  public tenant: TenantWithSpotSettingDto = new TenantWithSpotSettingDto();
  DataSource: DetailSpotByTenantIdDto[] = [];

  constructor(private authService: AuthService,
    private operationsService: OperationsService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }
  public get data (){
    return this.Model;
  }
  ngOnInit(): void {
    
    this._route.queryParams
    .subscribe(params => {
      this.getDetailSpot(params.id);
      this.getTenantId(params.id);
    });

   
  }

  getDetailSpot(id: number) {
    this.authService
      .getDetailSpotByTenantId(id)
      .subscribe((res: DetailSpotByTenantIdDto[]) => {
       this.DataSource = res
       
      });
  }

  getTenantId(id: number) {
    this.authService
      .getTenantById(id)
      .subscribe((res: TenantWithSpotSettingDto) => {
       this.tenant = res
      });
  }
}
