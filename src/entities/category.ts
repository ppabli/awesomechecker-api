import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Base } from "./base";
import { Product } from "./product";
import { Team } from "./team";

@Entity("categories", { schema: Base.schemaName })
class Category extends Base {

	public static necessaryPostParams: Record<string, any> = { "teamId": Number, "name": String };

	@Column()
	teamId: number;

	@ManyToOne(() => Team, team => team.categories)
	team: Team;

	@OneToMany(() => Product, product => product.category)
	products: Product[];

	@Column()
	name: string;

	@Column({ nullable: true })
	description: string;

}

export { Category };