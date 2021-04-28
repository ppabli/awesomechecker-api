import { Router } from 'express';

import { RouterInterface } from "./router.interface";
import { RouteInterface } from "../routes/route.interface";

// * Get routes
import { Info } from "../routes/get/info";
import { AllCategories } from '../routes/get/allCategories';
import { allPages } from '../routes/get/allPages';
import { AllProducts } from '../routes/get/allProducts';
import { AllProductsPages } from '../routes/get/allProductsPages';
import { AllReviews } from '../routes/get/allReviews';
import { AllReviewsAttributes } from '../routes/get/allReviewsAttributes';

// * Post routes
import { NewReview } from '../routes/post/newReview';

class MyRouter implements RouterInterface {

	private router: Router = Router();
	private API_VERSION: number = 1;
	private API_PATH: string = `/api/v${this.API_VERSION}/`
	private routes: RouteInterface[] = [

		// ! Get routes!
		new Info(),
		new AllProducts(),
		new AllCategories(),
		new allPages(),
		new AllProductsPages(),
		new AllReviews(),
		new AllReviewsAttributes(),

		// ! Post routes!
		new NewReview(),

	];

	constructor() {

		this.loadRoutes();

	}

	public getRouter(): Router {

		return this.router;

	}

	public getAPIVersion(): number {

		return this.API_VERSION;

	}

	public getAPIPath(): string {

		return this.API_PATH;

	}

	private loadRoutes() {

		for (let route of this.routes) {

			switch (route.getRequestMethod()) {

				case "get":
					this.router.get(route.getPath(), route.getMiddlewares(), route.getMethod());
					break;

				case "post":
					this.router.post(route.getPath(), route.getMiddlewares(), route.getMethod());
					break;

				case "patch":
					this.router.patch(route.getPath(), route.getMiddlewares(), route.getMethod());
					break;

				case "delete":
					this.router.delete(route.getPath(), route.getMiddlewares(), route.getMethod());
					break;

				default:
					break;

			}

		}

	}

} export { MyRouter }