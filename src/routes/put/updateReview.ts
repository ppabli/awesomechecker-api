import { updateReview } from "../../controllers/put_controller";
import { checkNecessaryParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class UpdateReview extends BaseRoute {

	constructor() {

		super();
		this.path = "/reviews/:id";
		this.method = updateReview;
		this.requestMethod = "patch";
		this.middlewares = [jwtValidation, checkNecessaryParams, filterAccesibleData];

	}

} export { UpdateReview };

