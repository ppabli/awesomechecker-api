import { getAllProducts } from "../../controllers/get_controller";
import { BaseRoute } from '../BaseRoute';

class AllProducts extends BaseRoute {

	constructor() {

		super();
		this.path = "/products";
		this.method = getAllProducts;
		this.requestMethod = "get";
		this.middlewares = [];

	}


} export { AllProducts };

