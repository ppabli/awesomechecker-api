import { ReviewAttribute } from "../entities/reviewAttribute";
import { BaseModel } from "./base.model";

class ReviewAttributeModel extends BaseModel {

	private key: string;
	private value: string;

	constructor(reviewAttribute: ReviewAttribute) {

		super(reviewAttribute);

		this.key = reviewAttribute.key;
		this.value = reviewAttribute.value;

	}

	public getKey(): string {
		return this.key;
	}

	public getValue(): string {
		return this.value;
	}

}

export { ReviewAttributeModel };

