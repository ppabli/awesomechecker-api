import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Base } from './base';
import { Category } from "./category";
import { Page } from './page';
import { Product } from './product';
import { Review } from './review';

@Entity("productPage", { schema: Base.schemaName })
export class ProductPage extends Base {

	public static necessaryPostParams: Record<string, any> = { "productId": Number, "pageId": Number, "url": String };

	@ManyToOne(() => Product, product => product.productPages)
	@JoinColumn({ name: "productId" })
	productId: Product;

	@OneToMany(() => Review, review => review.productPageId)
	reviews: Review[];

	@OneToOne(type => Page)
	@JoinColumn({ name: "pageId" })
	pageId: Page;

	@Column()
	url: string;

}