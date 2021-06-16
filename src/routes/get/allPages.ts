import { getAllPages } from "../../controllers/get_controller";
import { BaseRoute } from "../BaseRoute";

class AllPages extends BaseRoute {

	constructor() {

		super();
		this.path = "/pages";
		this.method = getAllPages;
		this.requestMethod = "get";
		this.middlewares = [];

	}

} 

export { AllPages };