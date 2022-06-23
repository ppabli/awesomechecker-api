import { getHash } from "../../controllers/get_controller";
import { BaseRoute } from "../BaseRoute";

class Hash extends BaseRoute {

	constructor() {

		super();
		this.path = "/hash";
		this.method = getHash;
		this.requestMethod = "get";
		this.middlewares = [];

	}

}

export { Hash };

