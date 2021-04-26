import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from './base';
import { ProductPage } from './productPage';

@Entity("review", { schema: Base.schemaName })
export class Review extends Base {

	public static necessaryPostParams: Record<string, any> = { "productPage": ProductPage, "value": Number, "currency": String };

	@ManyToOne(() => ProductPage, productPage => productPage.reviews)
	productPage: ProductPage;

	@Column()
	value: number;

	@Column()
	currency: string;


}