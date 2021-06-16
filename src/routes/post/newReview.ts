import { postNewReview } from "../../controllers/post_controller";
import { checkNecessaryParams } from "../../middlewares/middlewares";
import { BaseRoute } from '../BaseRoute';

class NewReview extends BaseRoute {

	constructor() {

		super();
		this.path = "/reviews";
		this.method = postNewReview;
		this.requestMethod = "post";
		this.middlewares = [checkNecessaryParams];

	}

} export { NewReview };

