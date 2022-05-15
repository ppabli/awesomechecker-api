import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Base } from "./base";
import { Page } from './page';
import { Product } from './product';
import { Rol } from './rol';
import { User } from './user';

@Entity("teams", { schema: Base.schemaName })
class Team extends Base {

	public static necessaryPostParams: Record<string, any> = { "name": String, "description": String };

	@OneToMany(() => Product, product => product.id)
	products: Product[];

	@OneToMany(() => Page, page => page.id)
	pages: Page[];

	@Column()
	name: string;

	@Column()
	token: string;

	@Column()
	description: string;

	@ManyToMany(() => User, user => user.teams)
	@JoinTable({
		name: "user_team",
		joinColumn: { name: "team_id", referencedColumnName: "id" },
		inverseJoinColumn: { name: "user_id", referencedColumnName: "id" }
	})
	users: User[];

	@OneToMany(() => Rol, rol => rol.team)
	roles: Rol[];

}

export { Team };
