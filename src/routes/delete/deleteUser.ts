import { deleteUser } from "../../controllers/delete_controller";
import { checkNecessaryDeleteParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from '../BaseRoute';

class DeleteUser extends BaseRoute {

	constructor() {

		super();
		this.path = "/users/:id";
		this.method = deleteUser;
		this.requestMethod = "delete";
		this.middlewares = [jwtValidation, checkNecessaryDeleteParams, filterAccesibleData];

	}

}

export { DeleteUser };

