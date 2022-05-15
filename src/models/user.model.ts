import { User } from './../entities/user';
import { BaseModel } from './base.model';

class UserModel extends BaseModel {

	private user: string;
	private email: string;

	constructor(user: User) {

		super(user);

		this.user = user.user;
		this.email = user.email;

	}

	public getUser(): string {
		return this.user;
	}

	public getEmail(): string {
		return this.email;
	}

}

class FullUserModel extends UserModel {

	private password: string;

	constructor(user: User) {

		super(user);
		this.password = user.password;

	}

	public getPassword(): string {
		return this.password;
	}

}

export { UserModel, FullUserModel };
