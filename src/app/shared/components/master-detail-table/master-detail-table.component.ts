import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppComponentBase } from 'src/app/_base/AppComponentBase';

@Component({
  selector: 'app-master-detail-table',
  templateUrl: './master-detail-table.component.html',
  styleUrls: ['./master-detail-table.component.scss'],
})
export class MasterDetailTableComponent
  extends AppComponentBase
  implements OnInit
{
  @Input() columnsSource: any[] = [];
  @Input() columnsDetailSource: any[] = [];
  @Input() keySource: string = '';
  @Input() dataSource: any[] = [];

  @Input() summary: any = {};
  @Input() showSelection: boolean = false;
  @Input() allowEditingDataSource: boolean = false;
  @Input() allowEditingDetailDataSource: boolean = false;
  @Input() allowSelectDataSource: boolean = false;
  @Input() allowSelectDetailDataSource: boolean = false;

  @Output() changedDataSource: EventEmitter<any> = new EventEmitter<any>();
  @Output() changedSelectionDetailDataSource: EventEmitter<any> = new EventEmitter<any>();
  @Output() changedDetailDataSource: EventEmitter<any> =
    new EventEmitter<any>();

  constructor() {
    super();
  }

  ngOnInit(): void {}

  onChangedDataSource(datagrid: any) {
    this.changedDataSource.emit(datagrid);
  }

  onChangedDetailDataSource(datagrid: any) {
    this.changedDetailDataSource.emit(datagrid);
  }

  onChangedSelectionDetailDataSource(datagrid: any) {
    this.changedSelectionDetailDataSource.emit(datagrid);
  }
}
