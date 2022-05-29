import { User } from './../entities/user';
import { BaseModel } from './base.model';
import { SimpleTeamModel } from './team.model';

class UserModel extends BaseModel {

	private user: string;
	private teams: SimpleTeamModel[];
	private email: string;
	private globalAdmin: boolean;

	constructor(dbUser: User) {

		super(dbUser);

		this.user = dbUser.user;
		this.email = dbUser.email;

		if (dbUser.teams) {

			this.teams = dbUser.teams.map(team => new SimpleTeamModel(team));

		}

		this.globalAdmin = false;

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

	public getGlobalAdmin(): boolean {
		return this.globalAdmin;
	}

	public setGlobalAdmin(globalAdmin: boolean): void {
		this.globalAdmin = globalAdmin;
	}

}

export { UserModel };

