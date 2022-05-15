import { postNewTeam } from "../../controllers/post_controller";
import { checkNecessaryParams } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class NewTeam extends BaseRoute {

	constructor() {

		super();
		this.path = "/teams";
		this.method = postNewTeam;
		this.requestMethod = "post";
		this.middlewares = [checkNecessaryParams];

	}

} export { NewTeam };

