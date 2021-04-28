import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from './base';
import { ProductPage } from './productPage';

@Entity("review", { schema: Base.schemaName })
export class Review extends Base {

	public static necessaryPostParams: Record<string, any> = { "productPageId": Number, "value": Number, "currency": String };

	@ManyToOne(() => ProductPage, productPage => productPage.reviews)
	@JoinColumn({ name: "productPageId" })
	productPageId: ProductPage;

	@Column()
	value: number;

	@Column()
	currency: string;

}