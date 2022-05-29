import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Base } from "./base";
import { Page } from './page';
import { Team } from './team';

@Entity("reviewAttributes", { schema: Base.schemaName })
class ReviewAttribute extends Base {

	public static necessaryPostParams: Record<string, any> = { "teamId": Number, "key": String, "value": String };

	@Column()
	teamId: number;

	@ManyToOne(() => Team, team => team.reviewAttributes)
	team: Team;

	@ManyToMany(() => Page, page => page.reviewAttributes)
	@JoinTable({
		name: "page_reviewAttribute",
		joinColumn: { name: "reviewAttribute_id", referencedColumnName: "id" },
		inverseJoinColumn: { name: "page_id", referencedColumnName: "id" }
	})
	pages: Page[];

	@Column()
	key: string;

	@Column()
	value: string;

}

export { ReviewAttribute };
