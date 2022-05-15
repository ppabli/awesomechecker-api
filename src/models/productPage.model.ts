import { ProductPage } from "../entities/productPage";
import { BaseModel } from "./base.model";
import { PageModel } from "./page.model";
import { ProductModel } from "./product.model";
import { ReviewModel } from "./review.model";

class ProductPageModel extends BaseModel {

	private product: ProductModel;
	private url: string;
	private page: PageModel;
	private reviews: ReviewModel[];

	constructor(productPage: ProductPage) {

		super(productPage);

		this.product = new ProductModel(productPage.product);
		this.url = productPage.url;
		this.page = new PageModel(productPage.page);
		this.reviews = [];

		for (let review of productPage.reviews) {
			this.reviews.push(new ReviewModel(review));
		}

	}

	public getProduct(): ProductModel {
		return this.product;
	}

	public getUrl(): string {
		return this.url;
	}

	public getPage(): PageModel {
		return this.page;
	}

	public getReviews(): ReviewModel[] {
		return this.reviews;
	}

}

export { ProductPageModel };