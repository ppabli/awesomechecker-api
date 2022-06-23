import { Page } from "../entities/page";
import { BaseModel } from "./base.model";
import { ReviewAttributeModel } from "./reviewAttribute.model";

class PageModel extends BaseModel {

	private name: string;
	private reviewTag: string;
	private reviewInside: boolean;
	private reviewInsideTag: string;
	private teamId: number;
	private description: string;
	private reviewAttributes: ReviewAttributeModel[];

	constructor(page: Page) {

		super(page);

		this.name = page.name;
		this.reviewTag = page.reviewTag;
		this.reviewInside = page.reviewInside;
		this.reviewInsideTag = page.reviewInsideTag;
		this.teamId = page.teamId;
		this.description = page.description;

		if (page.reviewAttributes) {

			this.reviewAttributes = page.reviewAttributes.map(reviewAttribute => new ReviewAttributeModel(reviewAttribute));

		}

	}

	public getReviewAttributes(): ReviewAttributeModel[] {
		return this.reviewAttributes;
	}

	public getDescription(): string {
		return this.description;
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

	public getTeamId(): number {
		return this.teamId;
	}

}

export { PageModel };
