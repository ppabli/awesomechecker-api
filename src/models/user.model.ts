import { UserType } from '../entities/userType';
import { User } from './../entities/user';
import { BaseModel } from './base.model';
import { RolModel } from './rol.model';
import { SimpleTeamModel } from './team.model';
import { UserTypeModel } from './userType.model';

class UserModel extends BaseModel {

	private user: string;
	private teams: SimpleTeamModel[];
	private email: string;
	private roles: RolModel[];
	private userType: UserTypeModel;

	constructor(dbUser: User) {

		super(dbUser);

		this.user = dbUser.user;
		this.email = dbUser.email;

		if (dbUser.teams) {

			this.teams = dbUser.teams.map(team => new SimpleTeamModel(team));

		}

		if (dbUser.roles) {

			this.roles = dbUser.roles.map(rol => new RolModel(rol));

		}

		if (dbUser.userType) {

			this.userType = new UserTypeModel(dbUser.userType);

		}

	}

	public getUser(): string {
		return this.user;
	}

	public getEmail(): string {
		return this.email;
	}

	public getTeams(): SimpleTeamModel[] {
		return this.teams;
	}

	public getRoles(): RolModel[] {
		return this.roles;
	}

	public getUserType(): UserTypeModel {
		return this.userType;
	}

}

export { UserModel };

