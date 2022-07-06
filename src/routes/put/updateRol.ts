import { updateRol } from "../../controllers/put_controller";
import { checkNecessaryParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class UpdateRol extends BaseRoute {

	constructor() {

		super();
		this.path = "/roles/:id";
		this.method = updateRol;
		this.requestMethod = "put";
		this.middlewares = [jwtValidation, checkNecessaryParams, filterAccesibleData];

	}

} export { UpdateRol };

