import { deleteReview } from "../../controllers/delete_controller";
import { BaseRoute } from '../BaseRoute';

class DeleteReview extends BaseRoute {

	constructor() {

		super();
		this.path = "/reviews/:id";
		this.method = deleteReview;
		this.requestMethod = "delete";
		this.middlewares = [];

	}

} 

export { DeleteReview };

