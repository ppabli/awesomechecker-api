import { ReviewAttribute } from "../entities/reviewAttribute";
import { BaseModel } from "./base.model";
import { PageModel } from "./page.model";
import { ProductPageModel } from "./productPage.model";

class ReviewAttributeModel extends BaseModel {

	private key: string;
	private value: string;
	private pageId: number;

	constructor(reviewAttribute: ReviewAttribute) {

		super(reviewAttribute);

		this.key = reviewAttribute.key;
		this.value = reviewAttribute.value;
		this.pageId = reviewAttribute.pageId;

	}

	public getKey(): string {
		return this.key;
	}

	public getValue(): string {
		return this.value;
	}

	public getPageId(): number {
		return this.pageId;
	}

}

export { ReviewAttributeModel };