import { RouteInterface } from "../route.interface";
import { RequestHandler } from 'express';

import { getAllReviews } from "../../controllers/get_controller"

class AllReviews implements RouteInterface {

	private path: string;
	private method: RequestHandler;
	private requestMethod: string;
	private middlewares: RequestHandler[];

	constructor() {

		this.path = "/reviews";
		this.method = getAllReviews;
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

} export { AllReviews }