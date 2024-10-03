import { PlantsTemporaryDto } from "../components/registration/dtos/plants-temporary-dto";

export class UserProfileDto {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  position: string;

  password: string;
  confirmPassword: string;
  businessName: string;
  str: string;
  businessPhone: string;
  businessCountry: string;
  businessAddress: string;
  legalRepresentativeFirstName: string;
  legalRepresentativeSurname: string;

  userType?: number;
  userTypeText?: string;
  plantsQty: number;

  applicationPlantTemporaries: PlantsTemporaryDto[];
  // List<ApplicationPlantTemporaryModel> ApplicationPlantTemporaries

  // List<int> RoleIds
  constructor() {
    this.plantsQty = 0;
    this.applicationPlantTemporaries = [];
  }
}
