import { Team } from '../entities/team';
import { BaseModel } from './base.model';

class TeamModel extends BaseModel {

	private name: string;
	private description: string;
	private token: string;

	constructor(team: Team) {

		super(team);

		this.name = team.name;
		this.description = team.description;
		this.token = team.token;

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

}

export { TeamModel };
