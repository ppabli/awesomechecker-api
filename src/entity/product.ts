import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Base } from './base';
import { Category } from './category';
import { ProductPage } from './productPage';

@Entity("product", { schema: Base.schemaName })
class Product extends Base {

	public static necessaryPostParams: Record<string, any> = { "category": Number, "name": String };

	@OneToOne(() => Category)
	@JoinColumn()
	category: Category;

	@OneToMany(() => ProductPage, productPage => productPage.id)
	productPages: ProductPage[];

	@Column()
	name: string;

}

export { Product };
