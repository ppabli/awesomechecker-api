import { User } from './../entities/user';
import { BaseModel } from './base.model';
import { RolModel } from './rol.model';
import { TeamModel } from './team.model';

class SimplifiedUser {
	id: number;
	name: string;
	email: string;
}

class UserModel extends BaseModel {

	private user: string;
	private email: string;
	private teams: TeamModel[];
	private roles: RolModel[];
	private globalAdmin: boolean;

	constructor(dbUser: User) {

		super(dbUser);

		this.user = dbUser.user;
		this.email = dbUser.email;

		if (dbUser.teams) {

			this.teams = dbUser.teams.map(team => new TeamModel(team));

		}

		if (dbUser.roles) {

			for (let rol of dbUser.roles) {

				this.roles.push(new RolModel(rol));

				if (rol.team.token == process.env.ADMIN_TEAM_TOKEN && rol.teamAdmin) {

					this.globalAdmin = true;

				}

			}

		}

	}

	public isAllowedTo(method: string, objectName: string, teamId: number): boolean {

		let isAllowed = false;

		let filteredRoles = this.roles.filter(rol => rol.getTeam().getId() == teamId);
		let rolData;

		for (let rol of filteredRoles) {

			switch (method) {

				case "get":

					rolData = rol.getGetPermissions();

					break;

				case "post":

					rolData = rol.getPostPermissions();

					break;

				case "put":

					rolData = rol.getPutPermissions();

					break;

				case "delete":

					rolData = rol.getDeletePermissions();

					break;

				default:

					break;

			}

			if (rolData[objectName] || rol.getTeamAdmin()) {

				isAllowed = true;
				break;

			}

		}

		return isAllowed;

	}

	public getUser(): string {
		return this.user;
	}

	public getEmail(): string {
		return this.email;
	}

	public getTeams(): TeamModel[] {
		return this.teams;
	}

	public isGlobalAdmin(): boolean {
		return this.globalAdmin;
	}

	public getSimplifiedUser(): SimplifiedUser {

		return {
			id: this.getId(),
			name: this.getUser(),
			email: this.getEmail(),
		}

	}

}

export { UserModel };
