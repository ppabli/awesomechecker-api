import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from "./base";
import { Page } from './page';
import { Team } from './team';

@Entity("reviewAttributes", { schema: Base.schemaName })
class ReviewAttribute extends Base {

	public static necessaryPostParams: Record<string, any> = { "teamId": Number, "pageId": Number, "key": String, "value": String };

	@Column()
	teamId: number;

	@ManyToOne(() => Team, team => team.reviewAttributes)
	team: Team;

	@Column()
	pageId: number;

	@ManyToOne(() => Page, page => page.reviewAttributes)
	page: Page;

	@Column()
	key: string;

	@Column()
	value: string;

}

export { ReviewAttribute };
