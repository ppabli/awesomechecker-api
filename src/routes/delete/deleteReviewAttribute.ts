import { deleteReviewAttribute } from "../../controllers/delete_controller";
import { checkNecessaryDeleteParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from '../BaseRoute';

class DeleteReviewAttribute extends BaseRoute {

	constructor() {

		super();
		this.path = "/reviewAttributes/:id";
		this.method = deleteReviewAttribute;
		this.requestMethod = "delete";
		this.middlewares = [jwtValidation, checkNecessaryDeleteParams, filterAccesibleData];

	}

}

export { DeleteReviewAttribute };

