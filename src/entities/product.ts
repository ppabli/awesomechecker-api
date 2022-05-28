import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Base } from './base';
import { Category } from './category';
import { ProductPage } from './productPage';
import { Team } from "./team";

@Entity("products", { schema: Base.schemaName })
class Product extends Base {

	public static necessaryPostParams: Record<string, any> = { "category": Number, "name": String };

	@Column()
	teamId: number;

	@ManyToOne(() => Team, team => team.products)
	team: Team;

	@Column()
	categoryId: number;

	@ManyToOne(() => Category, category => category.products)
	category: Category;

	@OneToMany(() => ProductPage, productPage => productPage.product)
	productPages: ProductPage[];

	@Column()
	name: string;

	@Column({ nullable: true })
	description: string;

}

export { Product };
