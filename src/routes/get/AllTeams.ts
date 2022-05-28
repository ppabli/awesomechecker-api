import { getAllTeams } from "../../controllers/get_controller";
import { filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class AllTeams extends BaseRoute {

	constructor() {

		super();
		this.path = "/teams/:teamId";
		this.method = getAllTeams;
		this.requestMethod = "get";
		this.middlewares = [jwtValidation, filterAccesibleData];

	}

} export { AllTeams };

