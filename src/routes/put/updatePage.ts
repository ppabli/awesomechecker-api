import { updatePage } from "../../controllers/put_controller";
import { checkNecessaryParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class UpdatePage extends BaseRoute {

	constructor() {

		super();
		this.path = "/pages/:id";
		this.method = updatePage;
		this.requestMethod = "put";
		this.middlewares = [jwtValidation, checkNecessaryParams, filterAccesibleData];

	}

} export { UpdatePage };

