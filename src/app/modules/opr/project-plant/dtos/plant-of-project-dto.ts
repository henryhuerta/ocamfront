export class PlantOfProjectDto {
    id: number;
    projectId: number;
    tech: string;
    name: string;
    projectStatusValue: string;
    accountNumber: string;

    country: string;
    dni: string;
    businessNameInstalation: string;
    nameInstalation: string;
    startUpDate: Date;
    deliveryCode: string;
    electricPower: number;
    initPeriodDate: Date;
    endPeriodDate: Date;
    
    certificatesRequested: number;
    certificatesApproved: number;
    certificatesAvailable: number;
    certificatesSpot: number;

}