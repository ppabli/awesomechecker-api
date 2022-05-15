import { login } from "../../controllers/post_controller";
import { BaseRoute } from "../BaseRoute";

class Login extends BaseRoute {

	constructor() {

		super();
		this.path = "/login";
		this.method = login;
		this.requestMethod = "post";
		this.middlewares = [];

	}

} export { Login };

