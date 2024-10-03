import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { OperationsService } from 'src/app/modules/opr/operation/operations.service';
import { MasterDetailTemplateComponent } from 'src/app/shared/components/master-detail-template/master-detail-template.component';
import { ModalWithOptionButtonsComponent } from 'src/app/shared/components/modal-with-option-buttons/modal-with-option-buttons.component';
import { OptionButton } from 'src/app/shared/models/option-button';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';
import { ProjectPlantsSpotDto } from '../dtos/project-plants-spot-dto';
import { ProjectRequestSpotDto } from '../dtos/project-request-spot';

@Component({
  selector: 'app-setup-spot-market',
  templateUrl: './setup-spot-market.component.html',
  styleUrls: []
})
export class SetupSpotMarketComponent   extends AppComponentBase
implements OnInit{

  OptionButtons: OptionButton[];
  title: string = 'Configurar mi Mercado Spot';
  errors: any = {};
  DataSource: ProjectRequestSpotDto[] = [];
  DataSourceDetail: ProjectPlantsSpotDto[] = [];
  public columnsDetail: any[] = [];
  columns: any[] = [];

  @ViewChild('entityComponent')
  entityComponent: ModalWithOptionButtonsComponent;
  @Output() modalSave = new EventEmitter<any>();
  @ViewChild('detailComp')
  detailComp: MasterDetailTemplateComponent;
  hasError: boolean = false;
  hasNegativeError: boolean = false;
  accountTypeId: number;



  constructor(
    private operationsService: OperationsService,) {
    super();
  }


  ngOnInit(): void {
      this.initializeView();
      this.columnsDetail = [
        {
          dataField: 'id',
          dataType: 'number',
          caption: 'id',
          allowEditing: false,
          alignment: 'left',
          visible: false
        },
        {
          dataField: 'techType',
          caption: 'Tecnología',
          allowEditing: false,
          alignment: 'left',
        },
        {
          dataField: 'businessNameInstalation',
          caption: 'Nombre',
          allowEditing: false,
          alignment: 'left',
        },
        {
          dataField: 'certificatesAvailable',
          caption: 'Certificados Disponibles',
          allowEditing: false,
          alignment: 'left',
        },
        {
          dataField: 'certificatesSpot',
          dataType: 'number',
          caption: 'Spot',
          allowEditing: true,
          alignment: 'left',
        },
        {
          dataField: 'spot',
          dataType: 'boolean',
          caption: 'Cert. Spot',
          width: "100",
          allowEditing: true,
          alignment: 'center',
        },
      ];
  }


  changeData(event : any ){
    this.DataSourceDetail.forEach(element => {

      if(element.certificatesSpot > element.certificatesAvailable)
       {
        this.hasError = true;
        return;
      }
      if(Number(element.certificatesSpot)  < 0)
       {
        this.hasNegativeError = true;
        return;
      }
      this.hasError = false
      this.hasNegativeError = false

    });
  }

  onEditorPreparing = (event: any) => {
    if(event.dataField === 'certificatesSpot'){
      if(!event.row.data.spot){
        event.editorOptions.disabled = true;
      }
   }
   if(event.dataField === 'spot'){
    if(!event.row.data.spot){
      event.row.data.certificatesSpot=0
    }
 }
  }


  async initializeView() {
    this.errors = {};
  }


  setButtonOptions(update?: boolean | null) {
    let permission: string[] = [];
    this.OptionButtons = [
      new OptionButton(
        'close',
        'Cerrar',
        'btn btn-danger pull-right',
        'fa fa-times'
      ),
      new OptionButton(
        'save',
        'Guardar',
        'btn btn-success pull-right',
        'fa fa-save',
        permission
      ),
    ];
  }

  optionButtonClicked($event: OptionButton) {
    switch ($event.btnName) {
      case "save":
        this.update();
        break;
      case 'close':
        this.close();
        break;
    }
  }
  update() {
    if((!this.hasError && !this.hasNegativeError))
    this.operationsService.updateProjectPlantSpotCertificates(this.DataSourceDetail, this.accountTypeId).subscribe(() => {
      this.getData(this.accountTypeId);
      this.close();
    }
    )
  }
  close() {
    this.entityComponent.close();
  }

  getData(id: number){
    this.accountTypeId = id;
    this.operationsService
    .getProjectPlants(id)
    .subscribe((res: ProjectPlantsSpotDto[]) => {
     this.DataSourceDetail = res

    });
  }
  getProjectPlantGroupSpot(id: number){
    this.accountTypeId = id;
    this.operationsService
    .getProjectPlantsGroupByAccountTypeId(id)
    .subscribe((res: ProjectRequestSpotDto[]) => {
     this.DataSource = res

    });
  }

  async showSetup(accountId: number) {
    await this.initializeView();
    this.setButtonOptions();
    this.entityComponent.show();
     this.getData(accountId);
     this.getProjectPlantGroupSpot(accountId);
  }
}
