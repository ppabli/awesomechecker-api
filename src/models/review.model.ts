import { Review } from "../entities/review";
import { BaseModel } from "./base.model";
import { ProductPageModel } from "./productPage.model";

class ReviewModel extends BaseModel {

	private productPage: ProductPageModel;
	private value: number;
	private currency: string;

	constructor(review: Review) {

		super(review);

		this.productPage = new ProductPageModel(review.productPage);
		this.value = review.value;
		this.currency = review.currency;

	}

	public getProductPage(): ProductPageModel {
		return this.productPage;
	}

	public getValue(): number {
		return this.value;
	}

	public getCurrency(): string {
		return this.currency;
	}

}

export { ReviewModel };