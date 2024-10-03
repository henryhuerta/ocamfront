import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import { AppComponentBase } from '../../../_base/AppComponentBase';

@Component({
  selector: 'app-master-detail-template',
  templateUrl: './master-detail-template.component.html',
  styleUrls: ['./master-detail-template.component.scss'],
})
export class MasterDetailTemplateComponent
  extends AppComponentBase
  implements OnInit
{
  @Input() columns: any[] = [];
  @Input() dataSource: any[] = [];
  @Input() allowEditingDataSource: boolean = false;
  @Input() allowSelectDataSource: boolean = false;
  @Input() onEditorPreparing: Function = () => {};

  @Output() changedData: EventEmitter<any> = new EventEmitter<any>();
  @Output() changedSelectedData: EventEmitter<any> = new EventEmitter<any>();

  DataSource: DataSource;

  constructor() {
    super();
  }

  ngOnInit(): void {}

  onChangedDataSource(data: any) {
    this.changedData.emit(data);
  }

  onChangedSelectionDataSource(data: any) {
    this.changedSelectedData.emit(data);
  }
}
