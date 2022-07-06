import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { Base } from "./base";
import { Rol } from "./rol";
import { Team } from "./team";
import { UserType } from "./userType";
@Entity("users", { schema: Base.schemaName })
class User extends Base {

	public static necessaryPostParams: Record<string, any> = { "user": String, "email": String, "password": String };

	@Column()
	user: string;

	@Column('text', {array: true})
	images: string[]

	@Column()
	email: string;

	@Column()
	password: string;

	@Column({ nullable: true })
	tempPassword: string;

	@Column({ nullable: true })
	userTypeId: number;

	@ManyToOne(() => UserType, userType => userType.users)
	userType: UserType

	@ManyToMany(() => Team, team => team.users)
	teams: Team[];

	@ManyToMany(() => Rol, rol => rol.users, {
		cascade: true
	})
	@JoinTable()
	roles: Rol[];

}

export { User };
