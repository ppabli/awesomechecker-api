import { getAPIInfo } from "../../controllers/get_controller";
import { jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class Info extends BaseRoute {

	constructor() {

		super();
		this.path = "/info";
		this.method = getAPIInfo;
		this.requestMethod = "get";
		this.middlewares = [jwtValidation];

	}

}

export { Info };
