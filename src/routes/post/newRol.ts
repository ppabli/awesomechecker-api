import { postNewRol } from "../../controllers/post_controller";
import { checkNecessaryParams } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class NewRol extends BaseRoute {

	constructor() {

		super();
		this.path = "/roles";
		this.method = postNewRol;
		this.requestMethod = "post";
		this.middlewares = [checkNecessaryParams];

	}

} export { NewRol };

