import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Base } from './base';
import { Category } from './category';
import { ProductPage } from './productPage';
import { Team } from "./team";

@Entity("products", { schema: Base.schemaName })
class Product extends Base {

	public static necessaryPostParams: Record<string, any> = { "category": Number, "name": String };

	@ManyToOne(() => Team, team => team.products)
	@JoinColumn()
	team: Team;

	@OneToOne(() => Category)
	@JoinColumn()
	category: Category;

	@OneToMany(() => ProductPage, productPage => productPage.id)
	productPages: ProductPage[];

	@Column()
	name: string;

	@Column()
	description: string;

}

export { Product };
