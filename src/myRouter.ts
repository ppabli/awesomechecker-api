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
import { Login } from './routes/post/login';

import { DeleteReview } from './routes/delete/deleteReview';
import { DeleteCategory } from './routes/delete/deleteCategory';
import { DeletePage } from './routes/delete/deletePage';
import { DeleteProduct } from './routes/delete/deleteProduct';
import { DeleteProductPage } from './routes/delete/deleteProductPage';
import { DeleteReviewAttribute } from './routes/delete/deleteReviewAttribute';
import { NewUser } from './routes/post/newUser';

class MyRouter {

	private router: Router;
	private API_VERSION: number;
	private API_PATH: string;
	private API_FULL_PATH: string;
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
		new NewUser(),
		new Login(),

		// ! Delete routes!
		new DeleteCategory(),
		new DeletePage(),
		new DeleteProduct(),
		new DeleteProductPage(),
		new DeleteReview(),
		new DeleteReviewAttribute(),

	];

	constructor(config: any) {

		this.router = Router();

		this.API_VERSION = +(process.env.npm_package_version.split(".")[0]);
		this.API_PATH = `/api/v${this.API_VERSION}/`;
		this.API_FULL_PATH = `${config.host}:${config.port}${this.API_PATH}`;

		logger.info(`API version ${this.API_VERSION}`);
		logger.info(`API path ${this.API_PATH}`);
		logger.info(`API full path ${this.API_FULL_PATH}`);

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

} export { MyRouter };

