import { getAllUsers } from "../../controllers/get_controller";
import { filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class AllUsers extends BaseRoute {

	constructor() {

		super();
		this.path = "/users";
		this.method = getAllUsers;
		this.requestMethod = "get";
		this.middlewares = [jwtValidation, filterAccesibleData];

	}

} export { AllUsers };

