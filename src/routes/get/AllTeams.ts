import { getAllTeams } from "../../controllers/get_controller";
import { BaseRoute } from "../BaseRoute";

class AllTeams extends BaseRoute {

	constructor() {

		super();
		this.path = "/teams/:teamId";
		this.method = getAllTeams;
		this.requestMethod = "get";
		this.middlewares = [];

	}

} export { AllTeams };

