import { getAllPages } from "../../controllers/get_controller";
import { filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class AllPages extends BaseRoute {

	constructor() {

		super();
		this.path = "/pages";
		this.method = getAllPages;
		this.requestMethod = "get";
		this.middlewares = [jwtValidation, filterAccesibleData];

	}

}

export { AllPages };