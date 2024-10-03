import { TechTypeDto } from "src/app/modules/data/tech-type/dtos/tech-type-dtos";

export class ProjectPlantsDto{
  projectRequestId: number;
  country: string;
  dni: string;
  businessNameInstalation: string;
  nameInstalation: string;
  startUpDate: Date;
  deliveryCode: string;
  techTypeId: number;
  techType: TechTypeDto;
  electricPower:boolean;
  initPeriodDate: Date;
  endPeriodDate: Date;
  certificatesRequested:number;
  certificatesApproved:boolean;
  certificatesAvailable: boolean;
}


