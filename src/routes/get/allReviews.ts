import { getAllReviews } from "../../controllers/get_controller";
import { BaseRoute } from "../BaseRoute";

class AllReviews extends BaseRoute {

	constructor() {

		super();
		this.path = "/reviews";
		this.method = getAllReviews;
		this.requestMethod = "get";
		this.middlewares = [];

	}

} export { AllReviews };

