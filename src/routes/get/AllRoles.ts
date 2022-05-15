import { getAllRoles } from "../../controllers/get_controller";
import { BaseRoute } from "../BaseRoute";

class AllRoles extends BaseRoute {

	constructor() {

		super();
		this.path = "/roles";
		this.method = getAllRoles;
		this.requestMethod = "get";
		this.middlewares = [];

	}

} export { AllRoles };

