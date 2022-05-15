import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Base } from './base';
import { ProductPage } from "./productPage";
import { ReviewAttribute } from './reviewAttribute';
import { Team } from "./team";

@Entity("pages", { schema: Base.schemaName })
class Page extends Base {

	public static necessaryPostParams: Record<string, any> = { "name": String, "reviewTag": String, "reviewInside": Boolean, "reviewInsideTag": String };

	@ManyToOne(() => Team, team => team.products)
	@JoinColumn()
	team: Team;

	@Column()
	name: string;

	@Column()
	reviewTag: string;

	@Column()
	reviewInside: boolean;

	@Column({ nullable: true })
	reviewInsideTag: string;

	@OneToMany(() => ReviewAttribute, reviewAttribute => reviewAttribute.id)
	reviewAttributes: ReviewAttribute[];

	@OneToMany(() => ProductPage, productPage => productPage.id)
	productPages: ProductPage[];

}

export { Page };
