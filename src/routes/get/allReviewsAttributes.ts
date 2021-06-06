import { getAllReviewsAttributes } from "../../controllers/get_controller";
import { BaseRoute } from "../BaseRoute";

class AllReviewsAttributes extends BaseRoute {

	constructor() {

		super();
		this.path = "/reviewAttributes";
		this.method = getAllReviewsAttributes;
		this.requestMethod = "get";
		this.middlewares = [];

	}

} export { AllReviewsAttributes };

