import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Base } from './base';
import { Page } from './page';
import { Product } from './product';
import { Review } from './review';

@Entity("productPage", { schema: Base.schemaName })
class ProductPage extends Base {

	public static necessaryPostParams: Record<string, any> = { "product": Number, "page": Number, "url": String };

	@ManyToOne(() => Product, product => product.productPages)
	@JoinColumn()
	product: Product;

	@OneToMany(() => Review, review => review.id)
	reviews: Review[];

	@ManyToOne(() => Page, page => page.productPages)
	@JoinColumn()
	page: Page;

	@Column()
	url: string;

}

export { ProductPage };
