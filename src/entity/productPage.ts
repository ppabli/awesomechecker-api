import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Base } from './base';
import { Category } from "./category";
import { Page } from './page';
import { Product } from './product';
import { Review } from './review';

@Entity("productPage", { schema: Base.schemaName })
export class ProductPage extends Base {

	public static necessaryPostParams: Record<string, any> = { "category": Category, "product": Product, "page": String, "url": String };

	@ManyToOne(() => Product, product => product.productPages)
	product: Product;

	@OneToMany(() => Review, review => review.productPage)
	reviews: Review[];

	@OneToOne(type => Page)
	@JoinColumn()
	page: Page;

	@Column()
	url: string;

}