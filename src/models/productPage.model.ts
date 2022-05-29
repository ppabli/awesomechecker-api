import { ProductPage } from "../entities/productPage";
import { BaseModel } from "./base.model";

class ProductPageModel extends BaseModel {

	private url: string;
	private productId: number;
	private pageId: number;

	constructor(productPage: ProductPage) {

		super(productPage);

		this.url = productPage.url;
		this.productId = productPage.productId;
		this.pageId = productPage.pageId;

	}

	public getUrl(): string {
		return this.url;
	}

	public getProductId(): number {
		return this.productId;
	}

	public getPageId(): number {
		return this.pageId;
	}

}

export { ProductPageModel };
