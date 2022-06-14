import { postNewCategory } from "../../controllers/post_controller";
import { checkNecessaryBodyParams, checkNecessaryParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class NewCategory extends BaseRoute {

	constructor() {

		super();
		this.path = "/categories";
		this.method = postNewCategory;
		this.requestMethod = "post";
		this.middlewares = [jwtValidation, checkNecessaryBodyParams, filterAccesibleData];

	}

} export { NewCategory };

