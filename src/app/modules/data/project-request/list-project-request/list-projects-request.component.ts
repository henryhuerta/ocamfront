import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AdminProjectRequestService } from 'src/app/modules/admin/project-request/admin-project-request.service';
import { ProjectRequest } from 'src/app/modules/admin/project-request/dtos/project-request';
import { PlantOfProjectDto } from 'src/app/modules/opr/project-plant/dtos/plant-of-project-dto';
import { ProjectPlantService } from 'src/app/modules/opr/project-plant/project-plant.services';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects-request.component.html',
  styleUrls: []
})
export class ListaProjectsRequestComponent extends AppComponentBase implements OnInit {
  @ViewChild("ProjectDetail") projectDetail: ProjectDetailComponent;
  @Output() onChangeCount: EventEmitter<any> = new EventEmitter();

  PlantsOfProjects: PlantOfProjectDto[] = [];

  public get data(): PlantOfProjectDto[] {
    return this.PlantsOfProjects;
  }

  constructor(private _plantProjectService: ProjectPlantService) {
    super();
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._plantProjectService.getTenantPlantOfProjects()
      .subscribe((result: PlantOfProjectDto[]) => {
        this.PlantsOfProjects = result;
        this.onChangeCount.emit(this.PlantsOfProjects.length);
      });
  }

  viewTransaction(data: PlantOfProjectDto) {
    this.projectDetail.showTransaction(data);
  }
}
