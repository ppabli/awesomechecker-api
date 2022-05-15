import { Column, Entity, OneToMany } from "typeorm";
import { Base } from './base';
import { ProductPage } from "./productPage";
import { ReviewAttribute } from './reviewAttribute';

@Entity("pages", { schema: Base.schemaName })
class Page extends Base {

	public static necessaryPostParams: Record<string, any> = { "name": String, "reviewTag": String, "reviewInside": Boolean, "reviewInsideTag": String };

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
