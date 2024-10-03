import { ProjectPlanItem } from '../transfer-certificates/dtos/transfer-certificates-dto';
import { ProjectPlanCertificatesDto } from './project-plant-certificates';
import { CertifierDto } from '../../../data/certifier/dtos/certifier-dto';

export class ProjectPlanDTO extends ProjectPlanItem {
  projectPlantCertificates: ProjectPlanCertificatesDto[];
  /**
   *
   */
  constructor() {
    super();
    this.projectPlantCertificates = [];
    this.startUpDate = new Date();
  }
}
