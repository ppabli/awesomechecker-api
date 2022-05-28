import { getAllCategories } from "../../controllers/get_controller";
import { filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from '../BaseRoute';

class AllCategories extends BaseRoute {

	constructor() {

		super();
		this.path = "/categories";
		this.method = getAllCategories;
		this.requestMethod = "get";
		this.middlewares = [jwtValidation, filterAccesibleData];

	}

}

export { AllCategories };
