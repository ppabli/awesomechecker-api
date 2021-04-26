import { RouteInterface } from "../route.interface";
import { RequestHandler } from 'express';

import { getAllReviewsAttributes } from "../../controllers/get_controller"

class AllReviewsAttributes implements RouteInterface {

	private path: string;
	private method: RequestHandler;
	private requestMethod: string;
	private middlewares: RequestHandler[];

	constructor() {

		this.path = "/reviewsAttributes";
		this.method = getAllReviewsAttributes;
		this.requestMethod = "get";
		this.middlewares = [];

	}

	public getPath(): string {

		return this.path;

	}

	public getMethod(): RequestHandler {

		return this.method;

	};

	public getRequestMethod(): string {

		return this.requestMethod;

	};

	public getMiddlewares(): RequestHandler[] {

		return this.middlewares;

	};

} export { AllReviewsAttributes }