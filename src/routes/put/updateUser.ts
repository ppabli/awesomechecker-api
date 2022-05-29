import { updateUser } from "../../controllers/put_controller";
import { checkNecessaryParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class UpdateUser extends BaseRoute {

	constructor() {

		super();
		this.path = "/users/:id";
		this.method = updateUser;
		this.requestMethod = "patch";
		this.middlewares = [jwtValidation, checkNecessaryParams, filterAccesibleData];

	}

} export { UpdateUser };

