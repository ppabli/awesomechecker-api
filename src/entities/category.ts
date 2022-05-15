import { Entity, Column } from "typeorm";
import { Base } from "./base";

@Entity("categories", { schema: Base.schemaName })
class Category extends Base {

	public static necessaryPostParams: Record<string, any> = { "name": String };

	@Column()
	name: string;

	@Column()
	description: string;

}

export { Category };