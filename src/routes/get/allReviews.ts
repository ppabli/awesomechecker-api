import { getAllReviews } from "../../controllers/get_controller";
import { filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class AllReviews extends BaseRoute {

	constructor() {

		super();
		this.path = "/reviews";
		this.method = getAllReviews;
		this.requestMethod = "get";
		this.middlewares = [jwtValidation, filterAccesibleData];

	}

} export { AllReviews };

