import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../../auth/services/auth.guard";
import { DetailSpotMarketComponent } from "./detail-spot-market/detail-spot-market.component";
import { SpotMarketComponent } from "./list-spot-market/spot-market.component";

const routes: Routes = [

    { path: '', component: SpotMarketComponent, canActivate: [AuthGuard], pathMatch: 'full'  },
    { path: 'detail-spot-market', component: DetailSpotMarketComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpotMarketRoutingModule {}
