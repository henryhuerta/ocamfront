export class ResumePlantProjectDto {
  certifierFrom: string;
  certifierTo: string;

  productionPeriod: string;
  startUpDate: string | null;
  businessNameInstalation: string;
  techType: string;
  country: string;

  certificatesAvailable: number;
  certificatesToTransfer: number;
  /**
   *
   */
  constructor() {
    this.certifierFrom = 'N/A';
    this.certifierTo = 'N/A';
    this.startUpDate = '';
  }
}
