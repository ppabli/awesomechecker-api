import { Product } from "../entities/product";
import { BaseModel } from "./base.model";

class ProductModel extends BaseModel {

	private name: string;
	private description: string;
	private teamId: number;
	private categoryId: number;
	private images: string[];

	constructor(product: Product) {

		super(product);

		this.name = product.name;
		this.description = product.description;
		this.teamId = product.teamId;
		this.categoryId = product.categoryId;
		this.images = product.images;

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

	public getImages(): string[] {
		return this.images;
	}

	public getCategoryId(): number {
		return this.categoryId;
	}

}

export { ProductModel };
