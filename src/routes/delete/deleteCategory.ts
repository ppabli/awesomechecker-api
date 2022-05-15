import { deleteCategory } from "../../controllers/delete_controller";
import { BaseRoute } from '../BaseRoute';

class DeleteCategory extends BaseRoute {

	constructor() {

		super();
		this.path = "/categories/:id";
		this.method = deleteCategory;
		this.requestMethod = "delete";
		this.middlewares = [];

	}

} 

export { DeleteCategory };

