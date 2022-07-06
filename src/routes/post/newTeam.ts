import { postNewTeam } from "../../controllers/post_controller";
import { checkNecessaryBodyParams, checkNecessaryParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class NewTeam extends BaseRoute {

	constructor() {

		super();
		this.path = "/teams";
		this.method = postNewTeam;
		this.requestMethod = "post";
		this.middlewares = [jwtValidation, globalThis.upload.array("images"), checkNecessaryBodyParams, filterAccesibleData];

	}

} export { NewTeam };

