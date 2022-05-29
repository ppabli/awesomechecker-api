import { deleteRol } from "../../controllers/delete_controller";
import { checkNecessaryParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from '../BaseRoute';

class DeleteRol extends BaseRoute {

	constructor() {

		super();
		this.path = "/roles/:id";
		this.method = deleteRol;
		this.requestMethod = "delete";
		this.middlewares = [jwtValidation, checkNecessaryParams, filterAccesibleData];

	}

}

export { DeleteRol };

