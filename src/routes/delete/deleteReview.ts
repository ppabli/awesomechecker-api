import { deleteReview } from "../../controllers/delete_controller";
import { checkNecessaryDeleteParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from '../BaseRoute';

class DeleteReview extends BaseRoute {

	constructor() {

		super();
		this.path = "/reviews/:id";
		this.method = deleteReview;
		this.requestMethod = "delete";
		this.middlewares = [jwtValidation, checkNecessaryDeleteParams, filterAccesibleData];


	}

}

export { DeleteReview };

