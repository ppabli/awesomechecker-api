import { Entity, Column, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { Base } from "./base";
import { Team } from "./team";
import { Rol } from "./rol";
@Entity("users", { schema: Base.schemaName })
class User extends Base {

	public static necessaryPostParams: Record<string, any> = { "user": String, "email": String, "password": String };

	@Column()
	user: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@ManyToMany(() => Team, team => team.users)
	@JoinTable({
		name: "user_team",
		joinColumn: { name: "user_id", referencedColumnName: "id" },
		inverseJoinColumn: { name: "team_id", referencedColumnName: "id" }
	})
	teams: Team[];

	@ManyToMany(() => Rol, rol => rol.users)
	@JoinTable({
		name: "user_rol",
		joinColumn: { name: "user_id", referencedColumnName: "id" },
		inverseJoinColumn: { name: "rol_id", referencedColumnName: "id" }
	})
	roles: Rol[];

}

export { User };