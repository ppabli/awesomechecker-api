import { postNewUser } from "../../controllers/post_controller";
import { checkNecessaryParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class NewUser extends BaseRoute {

	constructor() {

		super();
		this.path = "/users";
		this.method = postNewUser;
		this.requestMethod = "post";
		this.middlewares = [jwtValidation, checkNecessaryParams, filterAccesibleData];

	}

} export { NewUser };

