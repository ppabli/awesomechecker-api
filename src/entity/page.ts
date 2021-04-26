import { BulkWriteOpResultObject, Column, Entity, OneToMany } from "typeorm";
import { ReviewAttribute } from './reviewAttribute';
import { Base } from './base';

@Entity("page", { schema: Base.schemaName })
export class Page extends Base {

	public static necessaryPostParams: Record<string, any> = { "name": String, "reviewTag": String, "reviewInside": Boolean || String };

	@Column()
	name: string;

	@Column()
	reviewTag: string;

	@Column()
	reviewInside: boolean;

	@Column()
	reviewInsideTag: string;

	@OneToMany(() => ReviewAttribute, reviewAttribute => reviewAttribute.page)
	reviewAttributes: ReviewAttribute[];

}