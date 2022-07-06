import { updateTeam } from "../../controllers/put_controller";
import { checkNecessaryParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class UpdateTeam extends BaseRoute {

	constructor() {

		super();
		this.path = "/teams/:id";
		this.method = updateTeam;
		this.requestMethod = "put";
		this.middlewares = [jwtValidation, globalThis.upload.array("images"), checkNecessaryParams, filterAccesibleData];

	}

} export { UpdateTeam };

