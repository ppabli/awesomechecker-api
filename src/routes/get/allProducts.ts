import { getAllProducts } from "../../controllers/get_controller";
import { filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from '../BaseRoute';

class AllProducts extends BaseRoute {

	constructor() {

		super();
		this.path = "/products";
		this.method = getAllProducts;
		this.requestMethod = "get";
		this.middlewares = [jwtValidation, filterAccesibleData];

	}


} export { AllProducts };

