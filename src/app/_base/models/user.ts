export class User {
	fullName: string;
	firstName: string;
	lastName: string;
	tenantName: string;
	tenantId: number;
	expiration: Date;
	permissions: string[];
	token: string;
	userType: number;
	identity: string;
	pic: string;
  isFirstLogin?: boolean;
}
