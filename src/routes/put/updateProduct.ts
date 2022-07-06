import { updateCategory, updateProduct } from "../../controllers/put_controller";
import { checkNecessaryParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class UpdateProduct extends BaseRoute {

	constructor() {

		super();
		this.path = "/products/:id";
		this.method = updateProduct;
		this.requestMethod = "put";
		this.middlewares = [jwtValidation, globalThis.upload.array("images"), checkNecessaryParams, filterAccesibleData];

	}

} export { UpdateProduct };

