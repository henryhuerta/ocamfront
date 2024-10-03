export class TransferCertificateDto {
  id:number;
  selected: boolean;
  country: string;
  techType: string;
  year: number;
  techTypeId: number;
  
  businessNameInstalation: string;
  certificatesAvailable: number;
  certificatesToTransfer: number;

  projectPlants: ProjectPlanItem[];

  constructor() {}
}

export class PlantCertificateDto {
  id: number;
  transferCertificateId: number;
  plant: string;
  certificatesAvailable: number;
  certificatesToTransfer: number;

  constructor() {}
}

export class ProjectPlanItem {
  id: number;
  projectRequestId: number;
  country: string;
  dni: string;
  businessNameInstalation: string;
  nameInstalation: string;
  startUpDate: Date;
  deliveryCode: string;
  techTypeId: number;
  techType: string;
  electricPower: number;
  initPeriodDate: Date;
  endPeriodDate: Date;
  certificatesRequested: number;
  certificatesApproved: number;
  certificatesAvailable: number;
  certificatesToTransfer: number;

  /**
   *
   */
  constructor() {}
}
