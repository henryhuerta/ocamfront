
export class TenantWithSpotSettingDto {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  available: number;
  accountTypeIds: number[];

  constructor() {
    this.name = "";
    this.email = "";
    this.phoneNumber = "";
    this.accountTypeIds = [];
  }
}