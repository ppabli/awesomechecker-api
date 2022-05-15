import { postNewUser } from "../../controllers/post_controller";
import { checkNecessaryParams } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class NewUser extends BaseRoute {

	constructor() {

		super();
		this.path = "/users";
		this.method = postNewUser;
		this.requestMethod = "post";
		this.middlewares = [checkNecessaryParams];

	}

} export { NewUser };

