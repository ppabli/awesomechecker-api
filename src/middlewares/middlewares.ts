import { NextFunction, Request, Response } from 'express';
import { Category } from '../entities/category';
import { Page } from '../entities/page';
import { Product } from '../entities/product';
import { ProductPage } from '../entities/productPage';
import { Review } from '../entities/review';
import { ReviewAttribute } from '../entities/reviewAttribute';
import { Rol } from '../entities/rol';
import { Team } from '../entities/team';
import { User } from '../entities/user';
import { diff } from "../libs/arrayFunctions";
import { checkExpirationStatus, DecodeResult, decodeSession, encodeSession, ExpirationStatus, Session } from '../libs/sessionsFunctions';
import { TypeChecker } from "../libs/typeChecker";
import { RolModel } from '../models/rol.model';
import { TeamModel } from '../models/team.model';

function checkNecessaryParams(req: Request, res: Response, next: NextFunction): Response<any> {

	if (!req.params.id) {

		return res.status(400).json({ status: "error", statusCode: 400, message: "Unable to delete resource. This field must be provided: id" });

	} else {

		next();

	}

}

function checkNecessaryBodyParams(req: Request, res: Response, next: NextFunction): Response<any> {

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

		case "roles":

			requiredParams = Rol.necessaryPostParams;
			break;

		case "teams":

			requiredParams = Team.necessaryPostParams;
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

			return res.status(400).json({ status: "error", statusCode: 400, message: `Unable to create review resource. This field was provided with the wrong data type: ${text}` });

		}

	} else {

		return res.status(400).json({ status: "error", statusCode: 400, message: `Unable to create review resource. This fields must be provided: ${differences.join(', ')}` });

	}

}

function jwtValidation(req: Request, res: Response, next: NextFunction): Response<any> {

	const requestHeader = "authorization";
	const responseHeader = "authorization";
	const header = req.header(requestHeader);

	if (!header) {
		return res.status(403).json({ status: "error", statusCode: 403, message: `Required ${requestHeader} header not found.` });
	}

	const decodedSession: DecodeResult = decodeSession(header);

	if (decodedSession.type === "integrity-error" || decodedSession.type === "invalid-token") {
		return res.status(403).json({ status: "error", statusCode: 403, message: `Failed to decode or validate authorization token. Reason: ${decodedSession.type}.` });
	}

	const expiration: ExpirationStatus = checkExpirationStatus(decodedSession.session);

	if (expiration === "expired") {
		return res.status(403).json({ status: "error", statusCode: 403, message: "Authorization token has expired. Please create a new authorization token." });
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

	res.locals = {
		...res.locals,
		session: session
	};

	next();

}

function requireGlobalAdmin(req: Request, res: Response, next: NextFunction): Response<any> {

	if (res.locals.session.user.globalAdmin) {

		next();

	} else {

		return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action." });

	}

}

async function filterAccesibleData(req: Request, res: Response, next: NextFunction): Promise<Response<any>> {

	if (res.locals.session.user.globalAdmin) {

		next();

	} else {

		let url = req.url.split(/\//g);
		let objectName = url[url.length - 1];
		let method = req.method;

		let dbUser = await User.findOne({
			where: {
				id: res.locals.session.user.id
			}, relations: ["roles", "teams"]
		});

		let filteredTeams: TeamModel[] = [];

		if (dbUser.teams && dbUser.roles) {

			for (let team of dbUser.teams) {

				let filteredRoles = dbUser.roles.filter(role => role.teamId === team.id);

				for (let role of filteredRoles) {

					let parsedRol = new RolModel(role);
					let rolData;

					switch (method.toLowerCase()) {

						case "get":

							rolData = parsedRol.getGetPermissions();

							break;

						case "post":

							rolData = parsedRol.getPostPermissions();

							break;

						case "put":

							rolData = parsedRol.getPutPermissions();

							break;

						case "delete":

							rolData = parsedRol.getDeletePermissions();

							break;

						default:

							break;

					}

					if (rolData[objectName] || parsedRol.getTeamAdmin()) {

						filteredTeams.push(new TeamModel(team));
						break;

					}

				}

			}

		}

		if (filteredTeams) {

			res.locals.session.user.teams = filteredTeams;
			next();

		} else {

			return res.status(403).json({ status: "error", statusCode: 403, message: "You are not authorized to perform this action." });

		}

	}

}

export { checkNecessaryBodyParams, checkNecessaryParams, jwtValidation, requireGlobalAdmin, filterAccesibleData };
