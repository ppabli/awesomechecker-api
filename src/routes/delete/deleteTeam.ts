import { deleteTeam } from "../../controllers/delete_controller";
import { checkNecessaryDeleteParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from '../BaseRoute';

class DeleteTeam extends BaseRoute {

	constructor() {

		super();
		this.path = "/teams/:id";
		this.method = deleteTeam;
		this.requestMethod = "delete";
		this.middlewares = [jwtValidation, checkNecessaryDeleteParams, filterAccesibleData];

	}

}

export { DeleteTeam };

