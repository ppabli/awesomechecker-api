import { getAllReviewsAttributes } from "../../controllers/get_controller";
import { filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class AllReviewsAttributes extends BaseRoute {

	constructor() {

		super();
		this.path = "/reviewAttributes";
		this.method = getAllReviewsAttributes;
		this.requestMethod = "get";
		this.middlewares = [jwtValidation, filterAccesibleData];

	}

} export { AllReviewsAttributes };

