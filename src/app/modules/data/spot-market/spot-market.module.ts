import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SpotMarketComponent } from './list-spot-market/spot-market.component';
import { SpotMarketRoutingModule } from './spot-market.routing';
import { DetailSpotMarketComponent } from './detail-spot-market/detail-spot-market.component';
import { SetupSpotMarketComponent } from './setup-spot-market/setup-spot-market.component';



@NgModule({
  declarations: [SpotMarketComponent, DetailSpotMarketComponent, SetupSpotMarketComponent],
  imports: [
    CommonModule,
    SharedModule,
    SpotMarketRoutingModule
  ]
})
export class SpotMarketModule { }
