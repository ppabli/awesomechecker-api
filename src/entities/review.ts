import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from './base';
import { ProductPage } from './productPage';
import { Team } from './team';

@Entity("reviews", { schema: Base.schemaName })
class Review extends Base {

	public static necessaryPostParams: Record<string, any> = { "teamId": Number, "productPageId": Number, "value": Number };

	@Column()
	teamId: number;

	@ManyToOne(() => Team, team => team.pages)
	team: Team;

	@Column()
	productPageId: number;

	@ManyToOne(() => ProductPage, productPage => productPage.reviews)
	productPage: ProductPage;

	@Column({type: "float"})
	value: number;

}

export { Review };

