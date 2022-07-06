import { Team } from '../entities/team';
import { BaseModel } from './base.model';

class SimpleTeamModel {

	private id: number;
	private name: string;
	private token: string;
	private images: string[];

	constructor(dbTeam: Team) {

		this.id = dbTeam.id;
		this.name = dbTeam.name;
		this.token = dbTeam.token;
		this.images = dbTeam.images;

	}

	public getId(): number {
		return this.id;
	}

	public getName(): string {
		return this.name;
	}

	public getToken(): string {
		return this.token;
	}

	public getImges(): string[] {
		return this.images;
	}

}

class TeamModel extends BaseModel {

	private name: string;
	private token: string;
	private description: string;

	constructor(team: Team) {

		super(team);

		this.name = team.name;
		this.token = team.token;
		this.description = team.description;

	}

	public getName(): string {
		return this.name;
	}

	public getToken(): string {
		return this.token;
	}

	public getDescription(): string {
		return this.description;
	}

}

export { SimpleTeamModel, TeamModel };
