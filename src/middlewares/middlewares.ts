import { NextFunction, Request, Response } from 'express';
import { Category } from '../entity/category';
import { Page } from '../entity/page';
import { Product } from '../entity/product';
import { ProductPage } from '../entity/productPage';
import { Review } from '../entity/review';
import { ReviewAttribute } from '../entity/reviewAttribute';
import { diff } from "../libs/arrayFunctions";
import { TypeChecker } from "../libs/typeChecker";

function checkNecessaryParams(req: Request, res: Response, next: NextFunction) {

	let url = req.url.split(/\//g);
	let objectName = url[url.length - 1];

	let requiredParams: Record<string, any> = {};

	switch (objectName) {

		case "category":

			requiredParams = Category.necessaryPostParams;

			break;

		case "page":

			requiredParams = Page.necessaryPostParams;

			break;

		case "product":

			requiredParams = Product.necessaryPostParams;
			break;

		case "productPage":

			requiredParams = ProductPage.necessaryPostParams;
			break;

		case "review":

			requiredParams = Review.necessaryPostParams;
			break;

		case "reviewAttribute":

			requiredParams = ReviewAttribute.necessaryPostParams;
			break;

		default:

			break;

	}

	let differences = diff(Object.keys(requiredParams), Object.keys(req.body));

	if (!differences.length) {

		let invalidDataTypes = TypeChecker.validateDataTypes(requiredParams, req.body);

		if (!invalidDataTypes) {

			next();

		} else {

			let text = "";

			for (let param of invalidDataTypes) {

				text += `${param} with type: ${TypeChecker.getTypeString(requiredParams[param])} but was provided with ${TypeChecker.getTypeString(req.body[param])}`

			}

			res.status(400).json({ status: "error", statusCode: 400, message: `Unable to create review resource. This field was provided with the wrong data type: ${text}` });

		}

	} else {

		res.status(400).json({ status: "error", statusCode: 400, message: `Unable to create review resource. This fields must be provided: ${differences.join(', ')}` });

	}

}

export { checkNecessaryParams };

