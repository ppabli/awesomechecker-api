import { updateTeam } from "../../controllers/put_controller";
import { checkNecessaryParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class UpdateTeam extends BaseRoute {

	constructor() {

		super();
		this.path = "/teams/:id";
		this.method = updateTeam;
		this.requestMethod = "patch";
		this.middlewares = [jwtValidation, checkNecessaryParams, filterAccesibleData];

	}

} export { UpdateTeam };

