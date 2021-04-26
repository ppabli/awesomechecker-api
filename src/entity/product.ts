import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { ProductPage } from './productPage';
import { Base } from './base';
import { Category } from './category';

@Entity("product", { schema: Base.schemaName })
export class Product extends Base {

	public static necessaryPostParams: Record<string, any> = { "category": Category, "name": String };

	@OneToOne(() => Category)
	category: Category;

	@OneToMany(() => ProductPage, productPage => productPage.product)
	productPages: ProductPage[];

	@Column()
	name: string;

}