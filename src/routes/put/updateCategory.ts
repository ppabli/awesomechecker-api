import { updateCategory } from "../../controllers/put_controller";
import { checkNecessaryParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class UpdateCategory extends BaseRoute {

	constructor() {

		super();
		this.path = "/categories/:id";
		this.method = updateCategory;
		this.requestMethod = "patch";
		this.middlewares = [jwtValidation, checkNecessaryParams, filterAccesibleData];

	}

} export { UpdateCategory };

