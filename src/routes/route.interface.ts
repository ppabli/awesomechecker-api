import { RequestHandler } from 'express';

interface RouteInterface {

	getPath(): string;
	getRequestMethod(): string;
	getMethod(): RequestHandler;
	getMiddlewares(): RequestHandler[];

} export { RouteInterface }