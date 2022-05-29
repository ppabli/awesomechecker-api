import { Router } from 'express';
import { logger } from "./libs/logger";
import { BaseRoute } from "./routes/BaseRoute";
import { DeleteCategory } from './routes/delete/deleteCategory';
import { DeletePage } from './routes/delete/deletePage';
import { DeleteProduct } from './routes/delete/deleteProduct';
import { DeleteProductPage } from './routes/delete/deleteProductPage';
import { DeleteReview } from './routes/delete/deleteReview';
import { DeleteReviewAttribute } from './routes/delete/deleteReviewAttribute';
import { DeleteRol } from './routes/delete/deleteRol';
import { DeleteTeam } from './routes/delete/deleteTeam';
import { DeleteUser } from './routes/delete/deleteUser';
import { AllCategories } from './routes/get/allCategories';
import { AllPages } from './routes/get/allPages';
import { AllProducts } from './routes/get/allProducts';
import { AllProductsPages } from './routes/get/allProductsPages';
import { AllReviews } from './routes/get/allReviews';
import { AllReviewsAttributes } from './routes/get/allReviewsAttributes';
import { AllRoles } from './routes/get/AllRoles';
import { AllTeams } from './routes/get/AllTeams';
import { AllUsers } from './routes/get/AllUsers';
import { Info } from "./routes/get/info";
import { Login } from './routes/post/login';
import { NewCategory } from './routes/post/newCategory';
import { NewPage } from './routes/post/newPage';
import { NewProduct } from './routes/post/newProduct';
import { NewProductPage } from './routes/post/newProductPage';
import { NewReview } from './routes/post/newReview';
import { NewReviewAttribute } from './routes/post/newReviewAttribute';
import { NewRol } from './routes/post/newRol';
import { NewTeam } from './routes/post/newTeam';
import { NewUser } from './routes/post/newUser';
import { UpdateCategory } from './routes/put/updateCategory';
import { UpdatePage } from './routes/put/updatePage';
import { UpdateProduct } from './routes/put/updateProduct';
import { UpdateProductPage } from './routes/put/updateProductPage';
import { UpdateReview } from './routes/put/updateReview';
import { UpdateReviewAttribute } from './routes/put/updateReviewAttribute';
import { UpdateRol } from './routes/put/updateRol';
import { UpdateTeam } from './routes/put/updateTeam';
import { UpdateUser } from './routes/put/updateUser';

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
		new AllUsers(),
		new AllTeams(),
		new AllRoles(),

		// ! Post routes!
		new NewCategory(),
		new NewPage(),
		new NewProduct(),
		new NewProductPage(),
		new NewReview(),
		new NewReviewAttribute(),
		new NewUser(),
		new Login(),
		new NewRol(),
		new NewTeam(),

		// ! Delete routes!
		new DeleteCategory(),
		new DeletePage(),
		new DeleteProduct(),
		new DeleteProductPage(),
		new DeleteReview(),
		new DeleteReviewAttribute(),
		new DeleteRol(),
		new DeleteTeam(),
		new DeleteUser(),

		// ! Put routes!

		new UpdateCategory(),
		new UpdatePage(),
		new UpdateProductPage(),
		new UpdateProduct(),
		new UpdateReview(),
		new UpdateReviewAttribute(),
		new UpdateUser(),
		new UpdateTeam(),
		new UpdateRol(),

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

