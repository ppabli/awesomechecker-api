import { deleteProductPage } from "../../controllers/delete_controller";
import { checkNecessaryDeleteParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from '../BaseRoute';

class DeleteProductPage extends BaseRoute {

	constructor() {

		super();
		this.path = "/productPages/:id";
		this.method = deleteProductPage;
		this.requestMethod = "delete";
		this.middlewares = [jwtValidation, checkNecessaryDeleteParams, filterAccesibleData];

	}

}

export { DeleteProductPage };

