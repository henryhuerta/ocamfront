import { AccountDto } from 'src/app/modules/data/account/dtos/account-dtos';
import { ProjectPlantsDto } from '../../list-project-request/dttos/project-plants-dtos';
import { ProjectRequestDocumentDto } from './project-request-document';
import { ProjectRequestLogDto } from './project-request-log-dto';

export class ProjectRequest {
  id: number;
  isActive: boolean;

  requester: string;
  company: string;
  certifier: string;
  projectStatusValue: string;
  accountId: number;
  accountTypeId: number;
  certifierId: number;
  projectStatus: number;

  projectRequestDocuments: ProjectRequestDocumentDto[];

  projectRequestLogs: ProjectRequestLogDto[];

  log: ProjectRequestLogDto;

  projectPlants: ProjectPlantsDto[];
  account: AccountDto;

  techTypes: string;
  plantNames: string;
  accountNumber: string;
  timeOfRequest: Date;
  creationTime: Date;

  /**
   *
   */
  constructor(id?: number) {
    this.id = id ?? 0;
    this.projectStatus = 1;
    this.isActive = true;
    this.projectRequestDocuments = [];
    this.projectRequestLogs = [];
    this.projectPlants = [];
  }
}

export enum ProjectStatus {
  Pendiente = 1,
  Aceptado = 2,
  Rechazado = 3
}
