import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { OptionButton } from 'src/app/shared/models/option-button';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { ModalWithOptionButtonsComponent } from 'src/app/shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { ProjectRequest } from 'src/app/modules/admin/project-request/dtos/project-request';
import { AdminProjectRequestService } from 'src/app/modules/admin/project-request/admin-project-request.service';
import { PlantOfProjectDto } from 'src/app/modules/opr/project-plant/dtos/plant-of-project-dto';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent extends AppComponentBase implements OnInit {

  Model: PlantOfProjectDto = new PlantOfProjectDto();
  OptionButtons: OptionButton[];
  title: string = 'Detalle de Planta';
  errors: any = {};
  @ViewChild('entityComponent') entityComponent: ModalWithOptionButtonsComponent;

  constructor() {
    super();
  }
  ngOnInit(): void {

    this.initializeView();
  }

  async initializeView() {
    this.errors = {};
  }
  setButtonOptions(update?: boolean | null) {
    this.OptionButtons = [
      new OptionButton(
        'close',
        'Cerrar',
        'btn btn-danger pull-right',
        'fa fa-times'
      ),
    ];
  }

  optionButtonClicked($event: OptionButton) {
    switch ($event.btnName) {
      case 'close':
        this.close();
        break;
    }
  }

  close() {
    this.entityComponent.close();
  }

  async showTransaction(data: PlantOfProjectDto) {
    await this.initializeView();
    this.setButtonOptions();
    this.Model = data;
    this.entityComponent.show();
  }
}
