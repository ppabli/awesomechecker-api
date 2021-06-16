import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from "./base";
import { Page } from './page';

@Entity("reviewAttribute", { schema: Base.schemaName })
class ReviewAttribute extends Base {

	public static necessaryPostParams: Record<string, any> = { "page": Number, "key": String, "value": String };

	@ManyToOne(() => Page, page => page.reviewAttributes)
	@JoinColumn()
	page: Page;

	@Column()
	key: string;

	@Column()
	value: string;

}

export { ReviewAttribute };
