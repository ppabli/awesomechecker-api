import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Base } from "./base";
import { Category } from './category';
import { Page } from './page';
import { Product } from './product';
import { ProductPage } from './productPage';
import { Review } from './review';
import { ReviewAttribute } from './reviewAttribute';
import { Rol } from './rol';
import { User } from './user';

@Entity("teams", { schema: Base.schemaName })
class Team extends Base {

	public static necessaryPostParams: Record<string, any> = { "name": String, "description": String };

	@OneToMany(() => Product, product => product.team)
	products: Product[];

	@OneToMany(() => Page, page => page.team)
	pages: Page[];

	@OneToMany(() => Review, review => review.team)
	reviews: Review[];

	@OneToMany(() => Category, category => category.team)
	categories: Category[];

	@OneToMany(() => ReviewAttribute, reviewAttribute => reviewAttribute.team)
	reviewAttributes: ReviewAttribute[];

	@OneToMany(() => ProductPage, productPage => productPage.team)
	productPages: ProductPage[];

	@Column()
	name: string;

	@Column()
	token: string;

	@Column()
	description: string;

	@ManyToMany(() => User, user => user.teams)
	@JoinTable({
		name: "user_team",
		joinColumn: { name: "team_id", referencedColumnName: "id" },
		inverseJoinColumn: { name: "user_id", referencedColumnName: "id" }
	})
	users: User[];

	@OneToMany(() => Rol, rol => rol.team)
	roles: Rol[];

}

export { Team };
