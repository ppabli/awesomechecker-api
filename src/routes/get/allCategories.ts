import { getAllCategories } from "../../controllers/get_controller";
import { BaseRoute } from '../BaseRoute';

class AllCategories extends BaseRoute {

	constructor() {

		super();
		this.path = "/categories";
		this.method = getAllCategories;
		this.requestMethod = "get";
		this.middlewares = [];

	}

}

export { AllCategories };
