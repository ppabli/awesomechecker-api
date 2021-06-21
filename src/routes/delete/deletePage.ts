import { deletePage } from "../../controllers/delete_controller";
import { BaseRoute } from '../BaseRoute';

class DeletePage extends BaseRoute {

	constructor() {

		super();
		this.path = "/pages/:id";
		this.method = deletePage;
		this.requestMethod = "delete";
		this.middlewares = [];

	}

} 

export { DeletePage };

