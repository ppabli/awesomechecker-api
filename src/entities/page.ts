import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Base } from './base';
import { ProductPage } from "./productPage";
import { ReviewAttribute } from './reviewAttribute';
import { Team } from "./team";

@Entity("pages", { schema: Base.schemaName })
class Page extends Base {

	public static necessaryPostParams: Record<string, any> = { "teamId": Number, "name": String, "reviewTag": String, "reviewInside": Boolean, "reviewInsideTag": String };

	@Column()
	teamId: number;

	@ManyToOne(() => Team, team => team.pages)
	team: Team;

	@Column()
	name: string;

	@Column({ nullable: true })
	description: string;

	@Column()
	reviewTag: string;

	@Column()
	reviewInside: boolean;

	@Column({ nullable: true })
	reviewInsideTag: string;

	@ManyToMany(() => ReviewAttribute, reviewAttribute => reviewAttribute.pages)
	@JoinTable({
		name: "page_reviewAttribute",
		joinColumn: { name: "page_id", referencedColumnName: "id" },
		inverseJoinColumn: { name: "reviewAttribute_id", referencedColumnName: "id" }
	})
	reviewAttributes: ReviewAttribute[];

	@OneToMany(() => ProductPage, productPage => productPage.page)
	productPages: ProductPage[];

}

export { Page };
