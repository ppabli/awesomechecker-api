import { updateReviewAttribute } from "../../controllers/put_controller";
import { checkNecessaryParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class UpdateReviewAttribute extends BaseRoute {

	constructor() {

		super();
		this.path = "/reviewAttributes/:id";
		this.method = updateReviewAttribute;
		this.requestMethod = "patch";
		this.middlewares = [jwtValidation, checkNecessaryParams, filterAccesibleData];

	}

} export { UpdateReviewAttribute };

