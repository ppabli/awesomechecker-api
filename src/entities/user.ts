import { Entity, Column } from "typeorm";
import { Base } from "./base";

@Entity("users", { schema: Base.schemaName })
class User extends Base {

	public static necessaryPostParams: Record<string, any> = { "user": String, "email": String, "password": String };

	@Column()
	user: string;

	@Column()
	email: string;

	@Column()
	password: string;

}

export { User };