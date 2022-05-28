import { postNewProduct } from "../../controllers/post_controller";
import { checkNecessaryParams, filterAccesibleData, jwtValidation } from "../../middlewares/middlewares";
import { BaseRoute } from "../BaseRoute";

class NewProduct extends BaseRoute {

	constructor() {

		super();
		this.path = "/products";
		this.method = postNewProduct;
		this.requestMethod = "post";
		this.middlewares = [jwtValidation, checkNecessaryParams, filterAccesibleData];

	}


} export { NewProduct };

