import { deleteReviewAttribute } from "../../controllers/delete_controller";
import { checkNecessaryParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from '../BaseRoute';

class DeleteReviewAttribute extends BaseRoute {

	constructor() {

		super();
		this.path = "/reviewAttributes/:id";
		this.method = deleteReviewAttribute;
		this.requestMethod = "delete";
		this.middlewares = [jwtValidation, checkNecessaryParams, filterAccesibleData];

	}

}

export { DeleteReviewAttribute };

