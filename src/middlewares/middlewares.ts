import { NextFunction, Request, response, Response } from 'express';
import { Category } from '../entities/category';
import { Page } from '../entities/page';
import { Product } from '../entities/product';
import { ProductPage } from '../entities/productPage';
import { Review } from '../entities/review';
import { ReviewAttribute } from '../entities/reviewAttribute';
import { User } from '../entities/user';
import { diff } from "../libs/arrayFunctions";
import { checkExpirationStatus, DecodeResult, decodeSession, encodeSession, ExpirationStatus, Session } from '../libs/sessionsFunctions';
import { TypeChecker } from "../libs/typeChecker";

function checkNecessaryParams(req: Request, res: Response, next: NextFunction) {

	let url = req.url.split(/\//g);
	let objectName = url[url.length - 1];

	let requiredParams: Record<string, any> = {};

	switch (objectName) {

		case "categories":

			requiredParams = Category.necessaryPostParams;

			break;

		case "users":

			requiredParams = User.necessaryPostParams;

			break;

		case "pages":

			requiredParams = Page.necessaryPostParams;

			break;

		case "products":

			requiredParams = Product.necessaryPostParams;
			break;

		case "productPages":

			requiredParams = ProductPage.necessaryPostParams;
			break;

		case "reviews":

			requiredParams = Review.necessaryPostParams;
			break;

		case "reviewAttributes":

			requiredParams = ReviewAttribute.necessaryPostParams;
			break;

		default:

			break;

	}

	let differences = diff(Object.keys(requiredParams), Object.keys(req.body));

	if (!differences.length) {

		let invalidDataTypes = TypeChecker.validateDataTypes(requiredParams, req.body);

		if (!invalidDataTypes.length) {

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

function jwtValidation(req: Request, res: Response, next: NextFunction) {

	const unauthorized = (message: string) => res.status(401).json({
		ok: false,
		status: 401,
		message: message
	});

	const requestHeader = "authorization";
	const responseHeader = "authorization";
	const header = req.header(requestHeader);

	if (!header) {
		unauthorized(`Required ${requestHeader} header not found.`);
		return;
	}

	const decodedSession: DecodeResult = decodeSession(header);

	if (decodedSession.type === "integrity-error" || decodedSession.type === "invalid-token") {
		unauthorized(`Failed to decode or validate authorization token. Reason: ${decodedSession.type}.`);
		return;
	}

	const expiration: ExpirationStatus = checkExpirationStatus(decodedSession.session);

	if (expiration === "expired") {
		unauthorized(`Authorization token has expired. Please create a new authorization token.`);
		return;
	}

	let session: Session;

	if (expiration === "grace") {
		const { token, expires, issued } = encodeSession(decodedSession.session);
		session = {
			...decodedSession.session,
			expires: expires,
			issued: issued
		};
		res.setHeader(responseHeader, token);
	} else {
		session = decodedSession.session;
	}

	response.locals = {
		...response.locals,
		session: session
	};

	next();

}

export { checkNecessaryParams, jwtValidation };

