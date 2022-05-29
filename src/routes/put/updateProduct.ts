import { updateCategory, updateProduct } from "../../controllers/put_controller";
import { filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class UpdateProduct extends BaseRoute {

	constructor() {

		super();
		this.path = "/products/:id";
		this.method = updateProduct;
		this.requestMethod = "patch";
		this.middlewares = [jwtValidation, filterAccesibleData];

	}

} export { UpdateProduct };

