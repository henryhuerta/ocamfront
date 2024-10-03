import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateOrUpdateTechTypeComponent } from './create-or-update-tech-type/create-or-update-tech-type.component';
import { ListtechtypeComponent } from './list-tech-type/list-tech-type.component';
import { TechtypeRoutingModule } from './tech-type.routing';



@NgModule({
  declarations: [CreateOrUpdateTechTypeComponent, ListtechtypeComponent],
  imports: [
    SharedModule,
    TechtypeRoutingModule
  ]
})
export class TechtypeModule { }
