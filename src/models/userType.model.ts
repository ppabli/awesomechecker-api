import { UserType } from '../entities/userType';
import { User } from './../entities/user';
import { BaseModel } from './base.model';
import { RolModel } from './rol.model';
import { SimpleTeamModel } from './team.model';

class UserTypeModel extends BaseModel {

	private name: string;
	private description: string;
	private token: string;
	private maxRequests: number;

	constructor(dbUserType: UserType) {

		super(dbUserType);

		this.name = dbUserType.name;
		this.description = dbUserType.description;
		this.token = dbUserType.token;
		this.maxRequests = dbUserType.maxRequests;

	}

	public getName(): string {
		return this.name;
	}

	public getDescription(): string {
		return this.description;
	}

	public getToken(): string {
		return this.token;
	}

	public getMaxRequests(): number {
		return this.maxRequests;
	}

}

export { UserTypeModel };

