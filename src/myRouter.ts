import { Router } from 'express';
import { BaseRoute } from "./routes/BaseRoute";
import { logger } from "./libs/logger";

import { Info } from "./routes/get/info";

import { AllCategories } from './routes/get/allCategories';
import { AllPages } from './routes/get/allPages';
import { AllProducts } from './routes/get/allProducts';
import { AllProductsPages } from './routes/get/allProductsPages';
import { AllReviews } from './routes/get/allReviews';
import { AllReviewsAttributes } from './routes/get/allReviewsAttributes';

import { NewReview } from './routes/post/newReview';
import { NewCategory } from './routes/post/newCategory';
import { NewPage } from './routes/post/newPage';
import { NewProduct } from './routes/post/newProduct';
import { NewProductPage } from './routes/post/newProductPage';
import { NewReviewAttribute } from './routes/post/newReviewAttribute';

import { DeleteReview } from './routes/delete/deleteReview';
import { DeleteCategory } from './routes/delete/deleteCategory';
import { DeletePage } from './routes/delete/deletePage';
import { DeleteProduct } from './routes/delete/deleteProduct';
import { DeleteProductPage } from './routes/delete/deleteProductPage';
import { DeleteReviewAttribute } from './routes/delete/deleteReviewAttribute';
class MyRouter {

	private router: Router = Router();
	private API_VERSION: number = +(process.env.npm_package_version.split(".")[0]);
	private API_PATH: string = `/api/v${this.API_VERSION}/`
	private routes: BaseRoute[] = [

		// ! Get routes!
		new AllCategories(),
		new AllPages(),
		new AllProductsPages(),
		new AllProducts(),
		new AllReviews(),
		new AllReviewsAttributes(),
		new Info(),

		// ! Post routes!
		new NewCategory(),
		new NewPage(),
		new NewProduct(),
		new NewProductPage(),
		new NewReview(),
		new NewReviewAttribute(),

		// ! Delete routes!
		new DeleteCategory(),
		new DeletePage(),
		new DeleteProduct(),
		new DeleteProductPage(),
		new DeleteReview(),
		new DeleteReviewAttribute(),

	];

	constructor() {

		this.loadRoutes();

		logger.info(`API version ${this.API_VERSION}`);
		logger.info(`API path ${this.API_PATH}`);

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

} export { MyRouter };

