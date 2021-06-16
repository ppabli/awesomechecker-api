import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from './base';
import { ProductPage } from './productPage';

@Entity("review", { schema: Base.schemaName })
class Review extends Base {

	public static necessaryPostParams: Record<string, any> = { "productPage": Number, "value": Number, "currency": String };

	@ManyToOne(() => ProductPage, productPage => productPage.reviews)
	@JoinColumn()
	productPage: ProductPage;

	@Column({ type: "float" })
	value: number;

	@Column()
	currency: string;

}

export { Review };

