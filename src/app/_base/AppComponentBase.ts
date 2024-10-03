import DataSource from 'devextreme/data/data_source';
import { formatCurrency, formatDate, formatNumber } from '@angular/common';
// import { ConfigurationDto } from './views/gen/configuration/models/configuration-dto';
// import { TenantDto } from './views/auth/tenant/dtos/tenant-dto';
// import { db } from '../db/multilanguage-db';
import Swal from 'sweetalert2';

export abstract class AppComponentBase {
  DisplayFormatDate: string =
    this.getConfiguration('FORMAT_DATE') ?? 'MM-dd-yyyy';

  DisplayFormatDateTime: string =
    this.getConfiguration('FORMAT_DATE_TIME') ?? 'MM-dd-yyyy HH:mm';

  DisplayFormatTime: string = this.getConfiguration('FORMAT_TIME') ?? 'HH:mm';

  Currency: string = this.getConfiguration('SYMBOL_CURRENCY') ?? '$';

  Percent: string = this.getConfiguration('SYMBOL_PERCENT') ?? '%';

  CountryCode: string = this.getConfiguration('COUNTRY_CODE') ?? 'en-US';

  PhoneFormat: string = this.getConfiguration('FORMAT_PHONE') ?? '999-999-9999';

  MobilePhoneFormat: string =
    this.getConfiguration('FORMAT_PHONE') ?? '999-999-9999';

  CurrencyDxNumber: string = `${this.Currency} #,##0.##;(${this.Currency} #,##0.##)`;

  PercentDxNumber: string = `##0.## ${this.Percent};(##0.## ${this.Percent} )`;

  ContainerMask: string =
    this.getConfiguration('CONTAINER_MASK') ?? 'LLLL0000000';

  ChassisMask: string = this.getConfiguration('CHASSIS_MASK') ?? 'AAAAAAAA';

  Lat: string =
    this.getConfiguration('ON_DUTY_MAP_COORDINATE_LAT') ?? '39.786057';

  Lng: string =
    this.getConfiguration('ON_DUTY_MAP_COORDINATE_LNG') ?? '-100.146534';

  Zoom: string = this.getConfiguration('ON_DUTY_MAP_COORDINATE_ZOOM') ?? '4';

  /**
   *
   */
  constructor() { }
  // constructor() {
  // 	this.DisplayFormatDate = this.getConfiguration('FORMAT_DATE') ?? 'MM-dd-yyyy';
  // 	this.DisplayFormatDateTime = this.getConfiguration('FORMAT_DATE_TIME') ?? 'MM-dd-yyyy HH:mm';
  // 	this.DisplayFormatTime = this.getConfiguration('FORMAT_TIME') ?? "HH:mm";
  // 	this.PhoneFormat = this.getConfiguration('FORMAT_PHONE') ?? "999-999-9999";
  // 	this.MobilePhoneFormat = this.getConfiguration('FORMAT_PHONE') ?? "999-999-9999";
  // 	this.CurrencyDxNumber = `${this.Currency} #,##0.##;(${this.Currency} #,##0.##)`;
  // 	this.PercentDxNumber = `##0.## ${this.Percent};(##0.## ${this.Percent} )`;
  // 	this.ContainerMask = this.getConfiguration('CONTAINER_MASK') ?? "LLLL0000000";
  // 	this.ChassisMask = this.getConfiguration('CHASSIS_MASK') ?? "LLLL0000";
  // 	this.Lat = this.getConfiguration("ON_DUTY_MAP_COORDINATE_LAT");
  // 	this.Lng = this.getConfiguration("ON_DUTY_MAP_COORDINATE_LNG");
  // 	this.Zoom = this.getConfiguration("ON_DUTY_MAP_COORDINATE_ZOOM");
  // }
  public getConfiguration(key: string) {
    return null;
    // let configurations = JSON.parse(localStorage.getItem('CONFIGURATIONS')) as ConfigurationDto[];
    // if (configurations == null || configurations == undefined)
    // 	return null;
    // let configuration = configurations.find((config: ConfigurationDto) => config.key == key);
    // return configuration?.value;
  }

  // public updateTenantInfo(tenant: TenantDto) {
  // 	localStorage.setItem('TENANTINFO', JSON.stringify(tenant));
  // }

  // public getTenantConfig(key: string): any {
  // 	let tenantInfo = JSON.parse(localStorage.getItem('TENANTINFO')) as TenantDto[];
  // 	if (tenantInfo == null || tenantInfo == undefined)
  // 		return null;
  // 	let config = tenantInfo[key];
  // 	return config;
  // }

  public isInvalidObject(value: any) {
    let keys = Object.keys(value);
    let values = Object.values(value);
    return (
      value === undefined ||
      value === null ||
      keys.length === 0 ||
      values.length === 0
    );
  }

  public isUndefinedOrNull(value: any): boolean {
    return value == undefined || value == null || value.length === 0;
  }

  public isEmptyOrNullString(value: string): boolean {
    return (
      value == undefined || value == null || value == '' || value.length == 0
    );
  }

  public isEmptyOrNullNumber(value: number) {
    return value == undefined || value == null || value <= 0;
  }

  // calculateIsActiveDisplay(value) {
  // 	return value ? 'ACTIVE' : 'INACTIVE';
  // }
  // async successMlAsync(title: string, message: string): Promise<SweetAlertResult> {
  // 	let mTitle = await this.translate(title);
  // 	let mMessage = await this.translate(message);
  // 	return Swal.fire(mTitle, mMessage, "success");
  // }

  success(title: string, message: string) {
    Swal.fire({
      text: message,
      title: title,
      icon: "success",
      buttonsStyling: false,
      confirmButtonText: "ACEPTAR",
      customClass: {
        confirmButton: "btn btn-primary"
      }
    });
  }

  warning(title: string, message: string) {
    Swal.fire({
      text: message,
      title: title,
      icon: "warning",
      buttonsStyling: false,
      confirmButtonText: "ACEPTAR",
      customClass: {
        confirmButton: "btn btn-warning"
      }
    });
  }
  error(title: string, message: string) {
    Swal.fire({
      text: message,
      title: title,
      icon: "error",
      buttonsStyling: false,
      confirmButtonText: "ACEPTAR",
      customClass: {
        confirmButton: "btn btn-danger"
      }
    });
  }
  // 	Swal.fire({
  // 		type: "error",
  // 		toast: true,
  // 		text: message,
  // 		title: title,
  // 		position: 'bottom-right',
  // 		timer: 3000
  // 	});
  // }
  // removeBlanks(value: string): string {
  // 	if (this.isEmptyOrNullString(value))
  // 		return value;
  // 	return value.replace(/\s/g, '');
  // }
  // clone(obj: any): any {
  // 	return JSON.parse(JSON.stringify(obj));
  // }
  confirm(
    title?: string,
    message?: string,
    showCancel: boolean = true,
    confirmButtonText: string = 'Yes',
    cancelButtonText: string = 'Cancel'
  ) {
    return {
      value: true,
    };
  }
  // 	return Swal.fire({
  // 		title: this.isEmptyOrNullString(title) ? 'Are you sure to execute this action?' : title,
  // 		html: this.isEmptyOrNullString(message) ? "" : message,
  // 		showCancelButton: showCancel,
  // 		confirmButtonColor: '#32a932',
  // 		cancelButtonColor: '#d33',
  // 		confirmButtonText: this.isEmptyOrNullString(confirmButtonText) ? "Yes" : confirmButtonText,
  // 		cancelButtonText: this.isEmptyOrNullString(cancelButtonText) ? "Cancel" : cancelButtonText,
  // 	});
  // }
  // confirmWithInput(title?: string, message?: string) {
  // 	return Swal.fire({
  // 		title: this.isEmptyOrNullString(title) ? 'Are you sure to execute this action?' : title,
  // 		html: this.isEmptyOrNullString(message) ? "" : message,
  // 		showCancelButton: true,
  // 		confirmButtonColor: '#32a932',
  // 		cancelButtonColor: '#d33',
  // 		confirmButtonText: 'Accept',
  // 		input: "textarea"
  // 	});
  // }
  // customConfirm(title?: string, message?: string, confirmText?: string, cancelText?: string): Promise<SweetAlertResult> {
  // 	return Swal.fire({
  // 		title: this.isEmptyOrNullString(title) ? 'Are you sure to execute this action?' : title,
  // 		html: this.isEmptyOrNullString(message) ? "" : message,
  // 		showCancelButton: true,
  // 		confirmButtonColor: '#32a932',
  // 		cancelButtonColor: '#d33',
  // 		confirmButtonText: this.isEmptyOrNullString(confirmText) ? "Yes" : confirmText,
  // 		cancelButtonText: this.isEmptyOrNullString(cancelText) ? "Cancel" : cancelText
  // 	});
  // }

  // //NO USAR, USAR TEMPLATE Y EL PIPE DE CURRENCY  {{   AMOUNT | currency : Currency }}
  // dxCustomizeCurrency(column: any) {
  // 	return formatCurrency(column.value, this.CountryCode ?? 'en-US', this.Currency ?? '$');
  // }

  // getCurrency(value: any) {
  // 	return formatCurrency(value, this.CountryCode ?? 'en-US', this.Currency ?? '$');
  // }

  // CustomizeCurrency(number: any, locale: string, currency: string) {
  // 	return formatCurrency(number, locale, currency);
  // }

  // customizeTotalColumn = (data) => {
  // 	return  formatCurrency(data.value, this.CountryCode ?? 'en-US', this.Currency ?? '$');
  // }

  // CustomizeFormatDateTime(value: any) {
  // 	if (value !== null && value !== undefined) {
  // 		return formatDate(value as Date, this.DisplayFormatDateTime, this.CountryCode ?? 'en-US');
  // 	}
  // 	return '';
  // }

  // CustomizeFormatDate(value: any) {
  // 	if (value !== null) {
  // 		return formatDate(value as Date, this.DisplayFormatDate, this.CountryCode);
  // 	}
  // 	return null;
  // }

  // dxCustomizeFormatDate(column: any) {
  // 	return formatDate(column.value as Date, this.DisplayFormatDate, this.CountryCode ?? 'en-US');
  // }

  // dxCustomizeFormatDateTime(column: any) {
  // 	return formatDate(column.value as Date, this.DisplayFormatDateTime, this.CountryCode ?? 'en-US');
  // }

  // dxCustomizeDecimal(column: any) {
  // 	return formatNumber(column.value as number, this.CountryCode ?? 'en-US', '1.0-2');
  // }

  // dxCustomizePercent(column: any) {
  // 	return formatNumber(column.value as number, this.CountryCode ?? 'en-US', '1.0-2') + "%";
  // }

  // dxOnRowPrepared(e: any) {
  // 	e.rowElement.style.borderBottomColor = "#ababab";
  // 	e.rowElement.style.borderBottomWidth = "2px";
  // }

  getDataSourceDx(data: any[]): DataSource {
    return new DataSource({
      store: data,
      paginate: true,
      pageSize: 10,
    });
  }

  // any(array: any[], expression?: any | null) {
  // 	return expression != null ? array.filter(expression).length > 0 : array.length > 0;
  // }

  // remove(array: any[], expression: any) {
  // 	array.splice(array.findIndex(expression), 1);
  // }

  // getDate(any: any) {
  // 	return new Date(any);
  // }

  // async translate(key: string) {
  // 	let languageId = +localStorage.getItem("TRANS_LANG_ID");

  // 	let translation = await db.translations.where({ key: key, languageId: languageId }).first();

  // 	if (translation != null) return translation.translatedMessage;

  // 	return key;
  // }
}
