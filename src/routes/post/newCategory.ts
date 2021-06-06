import { postNewCategory } from "../../controllers/post_controller";
import { checkNecessaryParams } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class NewCategory extends BaseRoute {

	constructor() {

		super();
		this.path = "/categories";
		this.method = postNewCategory;
		this.requestMethod = "post";
		this.middlewares = [checkNecessaryParams];

	}

} export { NewCategory };

