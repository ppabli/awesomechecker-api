import { User } from './../entities/user';
import { BaseModel } from './base.model';

class UserModel extends BaseModel {

	private user: string;
	private email: string;
	private globalAdmin: boolean;

	constructor(dbUser: User) {

		super(dbUser);

		this.user = dbUser.user;
		this.email = dbUser.email;

		this.globalAdmin = false;

	}

	public getUser(): string {
		return this.user;
	}

	public getEmail(): string {
		return this.email;
	}

	public getGlobalAdmin(): boolean {
		return this.globalAdmin;
	}

	public setGlobalAdmin(globalAdmin: boolean): void {
		this.globalAdmin = globalAdmin;
	}

}

export { UserModel };
