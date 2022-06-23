import { Column, Entity, OneToMany } from "typeorm";
import { Base } from "./base";
import { User } from "./user";

@Entity("userTypes", { schema: Base.schemaName })
class UserType extends Base {

	public static necessaryPostParams: Record<string, any> = {};

	@Column()
	name: string

	@Column()
	token: string;

	@Column({nullable: true})
	description: string;

	@Column()
	maxRequests: number

	@Column({default: false})
	staffType: boolean

	@OneToMany(() => User, user => user.userType)
	users: User[]

}

export { UserType };
