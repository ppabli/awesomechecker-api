import { postNewPage } from "../../controllers/post_controller";
import { checkNecessaryBodyParams, checkNecessaryParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class NewPage extends BaseRoute {

	constructor() {

		super();
		this.path = "/pages";
		this.method = postNewPage;
		this.requestMethod = "post";
		this.middlewares = [jwtValidation, checkNecessaryBodyParams, filterAccesibleData];

	}

} export { NewPage };

