import { Product } from "../entities/product";
import { BaseModel } from "./base.model";
import { CategoryModel } from "./category.model";
import { ProductPageModel } from "./productPage.model";
import { TeamModel } from "./team.model";

class ProductModel extends BaseModel {

	private name: string;
	private description: string;
	private team: TeamModel;
	private category: CategoryModel;
	private productPages: ProductPageModel[];

	constructor(product: Product) {

		super(product);

		this.name = product.name;
		this.description = product.description;
		this.team = new TeamModel(product.team);
		this.category = new CategoryModel(product.category);

		for (let productPage of product.productPages) {
			this.productPages.push(new ProductPageModel(productPage));
		}

	}

	public getName(): string {
		return this.name;
	}

	public getDescription(): string {
		return this.description;
	}

	public getTeam(): TeamModel {
		return this.team;
	}

	public getCategory(): CategoryModel {
		return this.category;
	}

	public getProductPages(): ProductPageModel[] {
		return this.productPages;
	}

}

export { ProductModel };