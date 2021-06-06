import { getAllProductsPages } from "../../controllers/get_controller";
import { BaseRoute } from '../BaseRoute';

class AllProductsPages extends BaseRoute {

	constructor() {

		super();
		this.path = "/productPages";
		this.method = getAllProductsPages;
		this.requestMethod = "get";
		this.middlewares = [];

	}

} export { AllProductsPages };

