export class PlantsTemporaryDto {
  id: number;
  applicationUserProfileId: number;

  name: string;
  location: string;
  deliveryCode: string;
  isActive: boolean;

  /**
   *
   */
  constructor(id?: number) {
    this.id = id ?? 0;
  }
}
