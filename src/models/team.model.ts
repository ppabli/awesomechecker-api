import { Page } from '../entities/page';
import { Team } from '../entities/team';
import { User } from './../entities/user';
import { BaseModel } from './base.model';
import { PageModel } from './page.model';
import { ProductModel } from './product.model';
import { RolModel } from './rol.model';
import { UserModel } from './user.model';

class TeamModel extends BaseModel {

	private products: ProductModel[];
	private pages: PageModel[];
	private name: string;
	private description: string;
	private users: UserModel[];
	private roles: RolModel[];
	private token: string;

	constructor(team: Team) {

		super(team);

		for (let product of team.products) {
			this.products.push(new ProductModel(product));
		}

		for (let page of team.pages) {
			this.pages.push(new PageModel(page));
		}

		this.name = team.name;
		this.description = team.description;
		this.token = team.token;

		for (let user of team.users) {
			this.users.push(new UserModel(user));
		}

		for (let rol of team.roles) {
			this.roles.push(new RolModel(rol));
		}

	}

	public getProducts(): ProductModel[] {
		return this.products;
	}

	public getPages(): PageModel[] {
		return this.pages;
	}

	public getName(): string {
		return this.name;
	}

	public getDescription(): string {
		return this.description;
	}

	public getUsers(): UserModel[] {
		return this.users;
	}

	public getRoles(): RolModel[] {
		return this.roles;
	}

	public getToken(): string {
		return this.token;
	}

}

export { TeamModel };
