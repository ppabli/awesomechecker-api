import { postNewReviewAttribute } from "../../controllers/post_controller";
import { checkNecessaryBodyParams, checkNecessaryParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class NewReviewAttribute extends BaseRoute {

	constructor() {

		super();
		this.path = "/reviewAttributes";
		this.method = postNewReviewAttribute;
		this.requestMethod = "post";
		this.middlewares = [jwtValidation, checkNecessaryBodyParams, filterAccesibleData];

	}

} export { NewReviewAttribute };

