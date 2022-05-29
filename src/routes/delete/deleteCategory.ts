import { deleteCategory } from "../../controllers/delete_controller";
import { checkNecessaryParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from '../BaseRoute';

class DeleteCategory extends BaseRoute {

	constructor() {

		super();
		this.path = "/categories/:id";
		this.method = deleteCategory;
		this.requestMethod = "delete";
		this.middlewares = [jwtValidation, checkNecessaryParams, filterAccesibleData];

	}

}

export { DeleteCategory };

