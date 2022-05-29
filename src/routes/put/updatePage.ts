import { updatePage } from "../../controllers/put_controller";
import { filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class UpdatePage extends BaseRoute {

	constructor() {

		super();
		this.path = "/pages/:id";
		this.method = updatePage;
		this.requestMethod = "patch";
		this.middlewares = [jwtValidation, filterAccesibleData];

	}

} export { UpdatePage };

