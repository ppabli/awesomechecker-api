import { getAllProductsPages } from "../../controllers/get_controller";
import { filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from '../BaseRoute';

class AllProductsPages extends BaseRoute {

	constructor() {

		super();
		this.path = "/productPages";
		this.method = getAllProductsPages;
		this.requestMethod = "get";
		this.middlewares = [jwtValidation, filterAccesibleData];

	}

} export { AllProductsPages };

