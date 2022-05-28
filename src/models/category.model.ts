import { BaseModel } from "./base.model";
import { Category } from "./../entities/category";

class CategoryModel extends BaseModel {

	private name: string;
	private description: string;
	private teamId: number;

	constructor(category: Category) {

		super(category);

		this.name = category.name;
		this.description = category.description;
		this.teamId = category.teamId;

	}

	public getName(): string {
		return this.name;
	}

	public getDescription(): string {
		return this.description;
	}

	public getTeamId(): number {
		return this.teamId;
	}

}

export { CategoryModel };