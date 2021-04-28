import { Column, Entity, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { Base } from "./base";
import { Page } from './page';

@Entity("reviewAttribute", { schema: Base.schemaName })
export class ReviewAttribute extends Base {

	public static necessaryPostParams: Record<string, any> = { "pageId": Number, "key": String, "value": String };

	@ManyToOne(() => Page, page => page.reviewAttributes)
	@JoinColumn({ name: "pageId" })
	pageId: Page;

	@Column()
	key: string;

	@Column()
	value: string;

}