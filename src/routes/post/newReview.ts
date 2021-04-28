import { RequestHandler } from 'express';
import { postNewReview } from "../../controllers/post_controller";
import { RouteInterface } from "../route.interface";
import { checkNecessaryParams } from "../../middlewares/middlewares"

class NewReview implements RouteInterface {

	private path: string;
	private method: RequestHandler;
	private requestMethod: string;
	private middlewares: RequestHandler[];

	constructor() {

		this.path = "/reviews";
		this.method = postNewReview;
		this.requestMethod = "post";
		this.middlewares = [checkNecessaryParams];

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

} export { NewReview };
