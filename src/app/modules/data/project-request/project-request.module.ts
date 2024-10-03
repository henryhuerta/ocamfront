import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListaProjectsRequestComponent } from './list-project-request/list-projects-request.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';



@NgModule({
  declarations: [
    ProjectDetailComponent, ListaProjectsRequestComponent
  ],
  imports: [
    SharedModule
  ],
  exports:[
    ProjectDetailComponent, ListaProjectsRequestComponent
  ]
})
export class ProjectRequestModule { }
