import { ReviewAttribute } from "../entities/reviewAttribute";
import { BaseModel } from "./base.model";
import { PageModel } from "./page.model";
import { ProductPageModel } from "./productPage.model";

class ReviewAttributeModel extends BaseModel {

	private key: string;
	private value: string;
	private page: PageModel;

	constructor(reviewAttribute: ReviewAttribute) {

		super(reviewAttribute);

		this.key = reviewAttribute.key;
		this.value = reviewAttribute.value;
		this.page = new PageModel(reviewAttribute.page);

	}

	public getKey(): string {
		return this.key;
	}

	public getValue(): string {
		return this.value;
	}

	public getPage(): PageModel {
		return this.page;
	}

}

export { ReviewAttributeModel };