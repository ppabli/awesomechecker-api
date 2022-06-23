import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { Base } from "./base";
import { Team } from './team';
import { User } from './user';

@Entity("roles", { schema: Base.schemaName })
class Rol extends Base {

	public static necessaryPostParams: Record<string, any> = { "teamId": Number, "name": String, "description": String};

	@ManyToMany(() => User, user => user.roles)
	users: User[];

	@Column()
	teamId: number;

	@Column({default: false})
	staffRol: boolean

	@ManyToOne(() => Team, team => team.roles)
	team: Team;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	token: string;

	@Column({ default: false })
	teamAdmin: boolean;

	@Column({ default: false })
	canGetUsers: boolean;

	@Column({ default: false })
	canRemoveUser: boolean;

	@Column({ default: false })
	canEditUser: boolean;

	@Column({ default: false })
	canGetTeams: boolean;

	@Column({ default: false })
	canCreateTeam: boolean;

	@Column({ default: false })
	canRemoveTeam: boolean;

	@Column({ default: false })
	canEditTeam: boolean;

	@Column({ default: false })
	canGetRoles: boolean;

	@Column({ default: false })
	canCreateRol: boolean;

	@Column({ default: false })
	canRemoveRol: boolean;

	@Column({ default: false })
	canEditRol: boolean;

	@Column({ default: false })
	canGetCategories: boolean;

	@Column({ default: false })
	canCreateCategory: boolean;

	@Column({ default: false })
	canRemoveCategory: boolean;

	@Column({ default: false })
	canEditCategory: boolean;

	@Column({ default: false })
	canGetPages: boolean;

	@Column({ default: false })
	canCreatePage: boolean;

	@Column({ default: false })
	canRemovePage: boolean;

	@Column({ default: false })
	canEditPage: boolean;

	@Column({ default: false })
	canGetProducts: boolean;

	@Column({ default: false })
	canCreateProduct: boolean;

	@Column({ default: false })
	canRemoveProduct: boolean;

	@Column({ default: false })
	canEditProduct: boolean;

	@Column({ default: false })
	canGetProductPages: boolean;

	@Column({ default: false })
	canCreateProductPage: boolean;

	@Column({ default: false })
	canRemoveProductPage: boolean;

	@Column({ default: false })
	canEditProductPage: boolean;

	@Column({ default: false })
	canGetReviews: boolean;

	@Column({ default: false })
	canCreateReview: boolean;

	@Column({ default: false })
	canRemoveReview: boolean;

	@Column({ default: false })
	canEditReview: boolean;

	@Column({ default: false })
	canGetReviewAttributes: boolean;

	@Column({ default: false })
	canCreateReviewAttribute: boolean;

	@Column({ default: false })
	canRemoveReviewAttribute: boolean;

	@Column({ default: false })
	canEditReviewAttribute: boolean;

}

export { Rol };

