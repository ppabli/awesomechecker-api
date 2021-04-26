import { Router } from "express";

interface RouterInterface {

	getRouter(): Router;
	getAPIVersion(): number;
	getAPIPath(): string;

} export { RouterInterface }