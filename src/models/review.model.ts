import { Review } from "../entities/review";
import { BaseModel } from "./base.model";
import { ProductPageModel } from "./productPage.model";

class ReviewModel extends BaseModel {

	private value: number;
	private productPageId: number;

	constructor(review: Review) {

		super(review);

		this.value = review.value;
		this.productPageId = review.productPageId;

	}

	public getValue(): number {
		return this.value;
	}

	public getProductPageId(): number {
		return this.productPageId;
	}

}

export { ReviewModel };