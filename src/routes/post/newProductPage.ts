import { postNewProductPage } from "../../controllers/post_controller";
import { checkNecessaryParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from '../BaseRoute';

class NewProductPage extends BaseRoute {

	constructor() {

		super();
		this.path = "/productPages";
		this.method = postNewProductPage;
		this.requestMethod = "post";
		this.middlewares = [jwtValidation, checkNecessaryParams, filterAccesibleData];

	}


} export { NewProductPage };

