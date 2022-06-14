import { Review } from "../entities/review";
import { BaseModel } from "./base.model";

class ReviewModel extends BaseModel {

	private value: string;
	private productPageId: number;

	constructor(review: Review) {

		super(review);

		this.value = review.value;
		this.productPageId = review.productPageId;

	}

	public getValue(): string {
		return this.value;
	}

	public getProductPageId(): number {
		return this.productPageId;
	}

}

export { ReviewModel };
