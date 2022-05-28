import { deleteProduct } from "../../controllers/delete_controller";
import { checkNecessaryDeleteParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from '../BaseRoute';

class DeleteProduct extends BaseRoute {

	constructor() {

		super();
		this.path = "/products/:id";
		this.method = deleteProduct;
		this.requestMethod = "delete";
		this.middlewares = [jwtValidation, checkNecessaryDeleteParams, filterAccesibleData];

	}

} 

export { DeleteProduct };

