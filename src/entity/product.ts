import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { ProductPage } from './productPage';
import { Base } from './base';
import { Category } from './category';

@Entity("product", { schema: Base.schemaName })
export class Product extends Base {

	public static necessaryPostParams: Record<string, any> = { "categoryId": Number, "name": String };

	@OneToOne(() => Category)
	@JoinColumn({ name: "categoryId" })
	category: Category;

	@OneToMany(() => ProductPage, productPage => productPage.pageId)
	productPages: ProductPage[];

	@Column()
	name: string;

}