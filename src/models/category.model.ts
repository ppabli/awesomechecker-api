import { BaseModel } from "./base.model";
import { Category } from "./../entities/category";

class CategoryModel extends BaseModel {

	private name: string;
	private description: string;

	constructor(category: Category) {

		super(category);

		this.name = category.name;
		this.description = category.description;

	}

	public getName(): string {
		return this.name;
	}

	public getDescription(): string {
		return this.description;
	}

}

export { CategoryModel };