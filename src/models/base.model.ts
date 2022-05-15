import { Base } from './../entities/base';

class BaseModel {

	private id: number;
	private createdTimestamp: Date;
	private lastUpdateTimestamp: Date;

	constructor(base: Base) {

		this.id = base.id;
		this.createdTimestamp = base.createdTimestamp;
		this.lastUpdateTimestamp = base.lastUpdateTimestamp;

	}

	public getId(): number {
		return this.id;
	}

	public getCreatedTimestamp(): Date {
		return this.createdTimestamp;
	}

	public getLastUpdateTimestamp(): Date {
		return this.lastUpdateTimestamp;
	}

}

export { BaseModel };