import { Page } from "../entities/page";
import { BaseModel } from "./base.model";
import { ProductPageModel } from "./productPage.model";
import { ReviewAttributeModel } from "./reviewAttribute.model";
import { TeamModel } from "./team.model";

class PageModel extends BaseModel {

	private name: string;
	private reviewTag: string;
	private reviewInside: boolean;
	private reviewInsideTag: string;
	private reviewAttributes: ReviewAttributeModel[];
	private productPages: ProductPageModel[];
	private team: TeamModel;

	constructor(page: Page) {

		super(page);

		this.name = page.name;
		this.reviewTag = page.reviewTag;
		this.reviewInside = page.reviewInside;
		this.reviewInsideTag = page.reviewInsideTag;

		for (let reviewAttribute of page.reviewAttributes) {
			this.reviewAttributes.push(new ReviewAttributeModel(reviewAttribute));
		}

		for (let productPage of page.productPages) {
			this.productPages.push(new ProductPageModel(productPage));
		}

		this.team = new TeamModel(page.team);

	}

	public getName(): string {
		return this.name;
	}

	public getReviewTag(): string {
		return this.reviewTag;
	}

	public getReviewInside(): boolean {
		return this.reviewInside;
	}

	public getReviewInsideTag(): string {
		return this.reviewInsideTag;
	}

	public getReviewAttributes(): ReviewAttributeModel[] {
		return this.reviewAttributes;
	}

	public getProductPages(): ProductPageModel[] {
		return this.productPages;
	}

	public getTeam(): TeamModel {
		return this.team;
	}

}

export { PageModel };