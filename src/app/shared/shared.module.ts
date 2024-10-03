import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  DxTabPanelModule,
  DxTemplateModule,
  DxDataGridModule,
  DxSelectBoxModule,
  DxTextBoxModule,
  DxNumberBoxModule,
  DxDateBoxModule,
  DxTextAreaModule,
  DxAutocompleteModule,
  DxFileUploaderModule,
  DxRadioGroupModule,
  DxTreeListModule,
  DxCheckBoxModule,
  DxButtonGroupComponent,
  DxButtonGroupModule,
  DxSchedulerModule,
  DxValidatorModule,
  DxFormModule,
  DxValidationGroupModule,
} from 'devextreme-angular';
import { BasicTableListComponent } from './components/basic-table-list/basic-table-list.component';
import { PanelComponent } from './components/panel/panel.component';
import { ModalWithOptionButtonsComponent } from './components/modal-with-option-buttons/modal-with-option-buttons.component';
import { ValidatorMessageComponent } from './components/validator-message/validator-message.component';
import { MasterDetailTableComponent } from './components/master-detail-table/master-detail-table.component';
import { MasterDetailTemplateComponent } from './components/master-detail-template/master-detail-template.component';
export let AppInjector: Injector;

@NgModule({
  imports: [
    CommonModule,
    DxSchedulerModule,
    DxDataGridModule,
    DxTemplateModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxButtonGroupModule,
    DxTemplateModule,
    DxAutocompleteModule,
    DxNumberBoxModule,
    DxDateBoxModule,
    ReactiveFormsModule,
    DxTextAreaModule,
    DxFileUploaderModule,
    DxRadioGroupModule,
    DxTreeListModule,
    DxCheckBoxModule,
    DxTabPanelModule,
    DxValidatorModule,
    DxFormModule,
    DxValidationGroupModule,
  ],
  declarations: [
    BasicTableListComponent,
    PanelComponent,
    ModalWithOptionButtonsComponent,
    ValidatorMessageComponent,
    MasterDetailTableComponent,
    MasterDetailTemplateComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    DxDataGridModule,
    DxTemplateModule,
    DxSelectBoxModule,
    DxSchedulerModule,
    DxTextBoxModule,
    DxTemplateModule,
    DxAutocompleteModule,
    DxNumberBoxModule,
    DxDateBoxModule,
    DxFileUploaderModule,
    DxButtonGroupModule,
    ReactiveFormsModule,
    BasicTableListComponent,
    DxTextAreaModule,
    DxRadioGroupModule,
    DxCheckBoxModule,
    DxTreeListModule,
    PanelComponent,
    ModalWithOptionButtonsComponent,
    ValidatorMessageComponent,
    DxTabPanelModule,
    DxValidatorModule,
    DxFormModule,
    DxValidationGroupModule,
    MasterDetailTableComponent,
    MasterDetailTemplateComponent,
  ],
})
export class SharedModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
