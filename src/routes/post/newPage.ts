import { postNewPage } from "../../controllers/post_controller";
import { checkNecessaryParams } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class NewPage extends BaseRoute {

	constructor() {

		super();
		this.path = "/pages";
		this.method = postNewPage;
		this.requestMethod = "post";
		this.middlewares = [checkNecessaryParams];

	}

} export { NewPage };

