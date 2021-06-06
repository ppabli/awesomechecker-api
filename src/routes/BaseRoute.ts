import { RequestHandler } from 'express';

class BaseRoute {

	protected path: string;
	protected method: RequestHandler;
	protected requestMethod: string;
	protected middlewares: RequestHandler[];

	constructor() {


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

} export { BaseRoute };
