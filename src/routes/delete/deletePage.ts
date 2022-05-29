import { deletePage } from "../../controllers/delete_controller";
import { checkNecessaryParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from '../BaseRoute';

class DeletePage extends BaseRoute {

	constructor() {

		super();
		this.path = "/pages/:id";
		this.method = deletePage;
		this.requestMethod = "delete";
		this.middlewares = [jwtValidation, checkNecessaryParams, filterAccesibleData];

	}

}

export { DeletePage };

