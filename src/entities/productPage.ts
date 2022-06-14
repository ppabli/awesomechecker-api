import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { Base } from './base';
import { Page } from './page';
import { Product } from './product';
import { Review } from './review';
import { Team } from "./team";

@Entity("productPages", { schema: Base.schemaName })
class ProductPage extends Base {

	public static necessaryPostParams: Record<string, any> = { "teamId": Number, "productId": Number, "pageId": Number, "url": String };

	@Column()
	teamId: number;

	@ManyToOne(() => Team, team => team.pages)
	team: Team;

	@Column()
	productId: number;

	@ManyToOne(() => Product, product => product.productPages)
	product: Product;

	@OneToMany(() => Review, review => review.productPage)
	reviews: Review[];

	@Column()
	pageId: number;

	@ManyToOne(() => Page, page => page.productPages)
	page: Page;

	@Column()
	url: string;

	@Column({default: true})
	active: boolean;

}

export { ProductPage };
