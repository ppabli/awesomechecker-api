import { getAllRoles } from "../../controllers/get_controller";
import { filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class AllRoles extends BaseRoute {

	constructor() {

		super();
		this.path = "/roles";
		this.method = getAllRoles;
		this.requestMethod = "get";
		this.middlewares = [jwtValidation, filterAccesibleData];

	}

} export { AllRoles };

