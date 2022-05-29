import { deleteProduct } from "../../controllers/delete_controller";
import { checkNecessaryParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from '../BaseRoute';

class DeleteProduct extends BaseRoute {

	constructor() {

		super();
		this.path = "/products/:id";
		this.method = deleteProduct;
		this.requestMethod = "delete";
		this.middlewares = [jwtValidation, checkNecessaryParams, filterAccesibleData];

	}

} 

export { DeleteProduct };

