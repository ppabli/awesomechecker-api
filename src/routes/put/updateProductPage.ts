import { updateProductPage } from "../../controllers/put_controller";
import { checkNecessaryParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class UpdateProductPage extends BaseRoute {

	constructor() {

		super();
		this.path = "/productPages/:id";
		this.method = updateProductPage;
		this.requestMethod = "patch";
		this.middlewares = [jwtValidation, checkNecessaryParams, filterAccesibleData];

	}

} export { UpdateProductPage };

