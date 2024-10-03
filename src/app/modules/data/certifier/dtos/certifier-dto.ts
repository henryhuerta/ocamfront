import { ProjectRequestDto } from "src/app/modules/opr/operation/dtos/project-request-dto";

export class CertifierDto {
  id: number;
  textBox: string;
  numberBox: number;
  dateBox?: Date;
  isActive: boolean;
  selectId: number;

  name: string;
  description: string;
  contact: string;
  contactPhoneNumber: string;
  contactEmail: string;

  projectRequests?: ProjectRequestDto[];
  /**
   *
   */
  constructor(id?: number) {
    this.dateBox = new Date();

    this.id = id ?? 0;
  }
}
