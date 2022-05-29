import { Page } from "../entities/page";
import { BaseModel } from "./base.model";

class PageModel extends BaseModel {

	private name: string;
	private reviewTag: string;
	private reviewInside: boolean;
	private reviewInsideTag: string;
	private teamId: number;

	constructor(page: Page) {

		super(page);

		this.name = page.name;
		this.reviewTag = page.reviewTag;
		this.reviewInside = page.reviewInside;
		this.reviewInsideTag = page.reviewInsideTag;
		this.teamId = page.teamId;

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
